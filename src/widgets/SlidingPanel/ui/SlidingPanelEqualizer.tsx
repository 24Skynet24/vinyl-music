import { useState } from "react"
import {
    EqualizerBandValues,
    EqualizerPreset,
    equalizerBands,
    equalizerPresets,
    useAudioStore,
} from "../../../entities/audio"
import EqualizerBandControls from "./equalizer/EqualizerBandControls"
import EqualizerPresetActions from "./equalizer/EqualizerPresetActions"
import EqualizerPresetGroups from "./equalizer/EqualizerPresetGroups"
import EqualizerPresetModal, { EqualizerPresetModalMode } from "./equalizer/EqualizerPresetModal"
import { useTranslation } from "react-i18next"

const areEqualizerValuesEqual = (first: EqualizerBandValues, second: EqualizerBandValues) =>
    equalizerBands.every((band) => first[band.id] === second[band.id])

const getMatchingPresetId = (
    presetId: string | null,
    values: EqualizerBandValues,
    customPresets: EqualizerPreset[]
) => {
    if (!presetId) return null

    const preset = [...equalizerPresets, ...customPresets].find((item) => item.id === presetId)

    return preset && areEqualizerValuesEqual(preset.values, values) ? preset.id : null
}

function SlidingPanelEqualizer() {
    const { t } = useTranslation()
    const equalizerPresetId = useAudioStore((state) => state.equalizerPresetId)
    const equalizerValues = useAudioStore((state) => state.equalizerValues)
    const customEqualizerPresets = useAudioStore((state) => state.customEqualizerPresets)
    const setEqualizerBand = useAudioStore((state) => state.setEqualizerBand)
    const setEqualizerPreset = useAudioStore((state) => state.setEqualizerPreset)
    const createEqualizerPreset = useAudioStore((state) => state.createEqualizerPreset)
    const renameEqualizerPreset = useAudioStore((state) => state.renameEqualizerPreset)
    const deleteEqualizerPreset = useAudioStore((state) => state.deleteEqualizerPreset)
    const resetEqualizer = useAudioStore((state) => state.resetEqualizer)
    const [modalMode, setModalMode] = useState<EqualizerPresetModalMode | null>(null)
    const [presetName, setPresetName] = useState("")

    const selectedCustomPreset = customEqualizerPresets.find((preset) => preset.id === equalizerPresetId)
    const visibleSelectedPresetId = getMatchingPresetId(
        equalizerPresetId,
        equalizerValues,
        customEqualizerPresets
    )

    const openCreateModal = () => {
        setPresetName("")
        setModalMode("create")
    }

    const openRenameModal = () => {
        if (!selectedCustomPreset) return

        setPresetName(selectedCustomPreset.label)
        setModalMode("rename")
    }

    const closePresetModal = () => {
        setModalMode(null)
        setPresetName("")
    }

    const handlePresetNameSave = () => {
        const trimmedName = presetName.trim()
        if (!trimmedName) return

        if (modalMode === "create") {
            createEqualizerPreset(trimmedName)
        }

        if (modalMode === "rename" && selectedCustomPreset) {
            renameEqualizerPreset(selectedCustomPreset.id, trimmedName)
        }

        closePresetModal()
    }

    return (
        <>
            <div className="flex flex-col gap-[32px] text-white-main">
                <header className="flex items-start justify-between gap-[24px]">
                    <div className="flex flex-col gap-[8px]">
                        <h2 className="text-[48px] leading-none uppercase text-orange-main">
                            {t("equalizer.title")}
                        </h2>
                        <p className="max-w-[560px] text-[18px] text-gray-main font-futura">
                            {t("equalizer.description")}
                        </p>
                    </div>
                </header>

                <EqualizerPresetGroups
                    selectedPresetId={visibleSelectedPresetId}
                    customPresets={customEqualizerPresets}
                    onSelect={setEqualizerPreset}
                />

                <EqualizerBandControls
                    values={equalizerValues}
                    onChange={setEqualizerBand}
                />

                <EqualizerPresetActions
                    hasSelectedCustomPreset={Boolean(selectedCustomPreset)}
                    onCreate={openCreateModal}
                    onRename={openRenameModal}
                    onDelete={() => selectedCustomPreset && deleteEqualizerPreset(selectedCustomPreset.id)}
                    onReset={resetEqualizer}
                />
            </div>

            <EqualizerPresetModal
                mode={modalMode}
                name={presetName}
                onNameChange={setPresetName}
                onClose={closePresetModal}
                onSave={handlePresetNameSave}
            />
        </>
    )
}

export default SlidingPanelEqualizer