import { useState } from "react"
import {
    EQUALIZER_GAIN_MAX,
    EQUALIZER_GAIN_MIN,
    EqualizerBandId,
    equalizerBands,
    equalizerPresets,
    useAudioStore,
} from "../../../entities/audio"
import Modal from "../../../shared/ui/Modal/Modal"

function SlidingPanelEqualizer() {
    const equalizerPresetId = useAudioStore((state) => state.equalizerPresetId)
    const equalizerValues = useAudioStore((state) => state.equalizerValues)
    const customEqualizerPresets = useAudioStore((state) => state.customEqualizerPresets)
    const setEqualizerBand = useAudioStore((state) => state.setEqualizerBand)
    const setEqualizerPreset = useAudioStore((state) => state.setEqualizerPreset)
    const createEqualizerPreset = useAudioStore((state) => state.createEqualizerPreset)
    const renameEqualizerPreset = useAudioStore((state) => state.renameEqualizerPreset)
    const deleteEqualizerPreset = useAudioStore((state) => state.deleteEqualizerPreset)
    const resetEqualizer = useAudioStore((state) => state.resetEqualizer)
    const [modalMode, setModalMode] = useState<"create" | "rename" | null>(null)
    const [presetName, setPresetName] = useState("")

    const selectedCustomPreset = customEqualizerPresets.find((preset) => preset.id === equalizerPresetId)

    const handleBandChange = (bandId: EqualizerBandId, value: string) => {
        setEqualizerBand(bandId, Number(value))
    }
    const getPresetButtonClassName = (isSelected: boolean) =>
        `${isSelected ? "bg-orange-main text-black-main" : "bg-black-main text-white-main hover:text-orange-main"} rounded-[8px] border border-orange-main px-[18px] py-[10px] text-[18px] uppercase transition-colors duration-200 cursor-pointer`

    const actionButtonClassName = "press-btn rounded-[8px] border border-orange-main bg-black-main px-[18px] py-[10px] text-[18px] uppercase text-white-main transition-colors duration-200 hover:enabled:text-orange-main disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"

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
                            Equalizer
                        </h2>
                        <p className="max-w-[560px] text-[18px] text-gray-main font-futura">
                            Shape the sound with frequency bands, presets, and a flat reset
                        </p>
                    </div>
                </header>

                <section className="flex flex-col gap-[16px]">
                    <div className="flex flex-wrap gap-[12px]">
                        {equalizerPresets.map((preset) => (
                            <button
                                key={preset.id}
                                type="button"
                                onClick={() => setEqualizerPreset(preset.id)}
                                className={getPresetButtonClassName(equalizerPresetId === preset.id)}
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>

                    {customEqualizerPresets.length > 0 && (
                        <div className="flex flex-wrap gap-[12px]">
                            {customEqualizerPresets.map((preset) => (
                                <button
                                    key={preset.id}
                                    type="button"
                                    onClick={() => setEqualizerPreset(preset.id)}
                                    className={getPresetButtonClassName(equalizerPresetId === preset.id)}
                                >
                                    {preset.label}
                                </button>
                            ))}
                        </div>
                    )}
                </section>

                <section className="rounded-[16px] bg-black-main/40 px-[28px] py-[32px]">
                    <div className="mb-[24px] flex items-center justify-between text-[16px] uppercase text-white-main/60">
                        <span>{EQUALIZER_GAIN_MAX} dB</span>
                        <span>Gain</span>
                        <span>{EQUALIZER_GAIN_MIN} dB</span>
                    </div>

                    <div className="flex h-[360px] items-end justify-between gap-[16px]">
                        {equalizerBands.map((band) => (
                            <div key={band.id} className="flex h-full flex-col items-center justify-between gap-[16px]">
                                <span className="min-h-[28px] text-[18px] text-orange-main">
                                    {equalizerValues[band.id] > 0 ? "+" : ""}
                                    {equalizerValues[band.id]}
                                </span>

                                <input
                                    type="range"
                                    min={EQUALIZER_GAIN_MIN}
                                    max={EQUALIZER_GAIN_MAX}
                                    step={1}
                                    value={equalizerValues[band.id]}
                                    onChange={(event) => handleBandChange(band.id, event.target.value)}
                                    className="h-[220px] w-[28px] cursor-pointer accent-orange-main"
                                    style={{
                                        writingMode: "vertical-lr",
                                        direction: "rtl",
                                    }}
                                />

                                <span className="text-[18px] uppercase text-white-main">
                                    {band.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="flex flex-col gap-[16px]">
                    <p className="text-[16px] text-gray-main font-futura">
                        Boosting many bands can make audio louder and distorted. Custom presets are saved automatically
                    </p>

                    <div className="flex flex-wrap items-center gap-[12px]">
                        <button
                            type="button"
                            onClick={openCreateModal}
                            className={actionButtonClassName}
                        >
                            Save as preset
                        </button>
                        <button
                            type="button"
                            onClick={openRenameModal}
                            disabled={!selectedCustomPreset}
                            className={actionButtonClassName}
                        >
                            Rename
                        </button>
                        <button
                            type="button"
                            onClick={() => selectedCustomPreset && deleteEqualizerPreset(selectedCustomPreset.id)}
                            disabled={!selectedCustomPreset}
                            className={actionButtonClassName}
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            onClick={resetEqualizer}
                            className={actionButtonClassName}
                        >
                            Reset
                        </button>
                    </div>
                </footer>
            </div>

            <Modal isOpen={modalMode !== null} onClose={closePresetModal}>
                <div className="w-[520px] px-[32px] py-[56px]">
                    <div className="flex flex-col gap-[28px]">
                        <h3 className="text-[36px] uppercase text-orange-main">
                            {modalMode === "rename" ? "Rename preset" : "Create preset"}
                        </h3>
                        <input
                            type="text"
                            value={presetName}
                            onChange={(event) => setPresetName(event.target.value)}
                            placeholder="Preset name..."
                            className="w-full rounded-[8px] bg-black-main px-[16px] py-[14px] text-[22px] text-white-main outline-none"
                        />
                        <div className="ml-auto flex gap-[12px]">
                            <button
                                type="button"
                                onClick={closePresetModal}
                                className="rounded-[8px] border border-orange-main bg-black-main px-[18px] py-[10px] text-[18px] uppercase text-white-main transition-colors duration-200 hover:text-orange-main cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handlePresetNameSave}
                                className="rounded-[8px] border border-orange-main bg-orange-main px-[18px] py-[10px] text-[18px] uppercase text-black-main transition-colors duration-200 cursor-pointer"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default SlidingPanelEqualizer