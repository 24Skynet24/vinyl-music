import { EqualizerPreset, EqualizerPresetId, equalizerPresets } from "../../../../entities/audio"
import { useTranslation } from "react-i18next"

interface EqualizerPresetGroupsProps {
    selectedPresetId: EqualizerPresetId | null
    customPresets: EqualizerPreset[]
    onSelect: (presetId: EqualizerPresetId) => void
}

function EqualizerPresetGroups({ selectedPresetId, customPresets, onSelect }: EqualizerPresetGroupsProps) {
    const { t } = useTranslation()
    const getPresetButtonClassName = (isSelected: boolean) =>
        `${isSelected ? "bg-orange-main text-black-main" : "bg-black-main text-white-main hover:text-orange-main"} rounded-[8px] border border-orange-main px-[18px] py-[10px] text-[18px] uppercase transition-colors duration-200 cursor-pointer`

    return (
        <section className="flex flex-col gap-[16px]">
            <div className="flex flex-wrap gap-[12px]">
                {equalizerPresets.map((preset) => (
                    <button
                        key={preset.id}
                        type="button"
                        onClick={() => onSelect(preset.id)}
                        className={getPresetButtonClassName(selectedPresetId === preset.id)}
                    >
                        {t(`equalizer.presets.${preset.id}`, { defaultValue: preset.label })}
                    </button>
                ))}
            </div>

            {customPresets.length > 0 && (
                <div className="flex flex-wrap gap-[12px]">
                    {customPresets.map((preset) => (
                        <button
                            key={preset.id}
                            type="button"
                            onClick={() => onSelect(preset.id)}
                            className={getPresetButtonClassName(selectedPresetId === preset.id)}
                        >
                            {preset.label}
                        </button>
                    ))}
                </div>
            )}
        </section>
    )
}

export default EqualizerPresetGroups
