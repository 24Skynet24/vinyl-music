import { RefObject, useCallback, useEffect, useRef } from "react"
import { EqualizerBandValues, equalizerBands } from "../../../entities/audio"

interface EqualizerAudioGraph {
    context: AudioContext
    source: MediaElementAudioSourceNode
    filters: BiquadFilterNode[]
}

export const useEqualizerAudioGraph = (
    audioRef: RefObject<HTMLAudioElement | null>,
    equalizerValues: EqualizerBandValues
) => {
    const equalizerGraphRef = useRef<EqualizerAudioGraph | null>(null)

    const createEqualizerGraph = useCallback(() => {
        const audio = audioRef.current
        if (!audio) return null
        if (equalizerGraphRef.current) return equalizerGraphRef.current

        const context = new AudioContext()
        const source = context.createMediaElementSource(audio)
        const filters = equalizerBands.map((band, index) => {
            const filter = context.createBiquadFilter()

            filter.frequency.value = band.frequency
            filter.gain.value = 0
            filter.Q.value = 1

            if (index === 0) {
                filter.type = "lowshelf"
            } else if (index === equalizerBands.length - 1) {
                filter.type = "highshelf"
            } else {
                filter.type = "peaking"
            }

            return filter
        })

        source.connect(filters[0])
        filters.forEach((filter, index) => {
            const nextNode = filters[index + 1] ?? context.destination
            filter.connect(nextNode)
        })

        const graph = { context, source, filters }
        equalizerGraphRef.current = graph

        return graph
    }, [audioRef])

    const applyEqualizerValues = useCallback((graph: EqualizerAudioGraph) => {
        equalizerBands.forEach((band, index) => {
            const filter = graph.filters[index]
            const gain = equalizerValues[band.id]

            filter.gain.setTargetAtTime(gain, graph.context.currentTime, 0.01)
        })
    }, [equalizerValues])

    const resumeEqualizerGraph = useCallback(() => {
        const graph = createEqualizerGraph()
        if (!graph) return

        applyEqualizerValues(graph)
        graph.context.resume().catch(() => undefined)
    }, [applyEqualizerValues, createEqualizerGraph])

    useEffect(() => {
        const graph = equalizerGraphRef.current
        if (!graph) return

        applyEqualizerValues(graph)
    }, [applyEqualizerValues])

    useEffect(() => {
        return () => {
            const graph = equalizerGraphRef.current
            if (!graph) return

            graph.source.disconnect()
            graph.filters.forEach((filter) => filter.disconnect())
            graph.context.close()
            equalizerGraphRef.current = null
        }
    }, [])

    return resumeEqualizerGraph
}
