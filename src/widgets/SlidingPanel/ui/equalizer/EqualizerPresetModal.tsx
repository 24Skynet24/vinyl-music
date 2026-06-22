import Modal from "../../../../shared/ui/Modal/Modal"
import { useTranslation } from "react-i18next"

export type EqualizerPresetModalMode = "create" | "rename"

interface EqualizerPresetModalProps {
    mode: EqualizerPresetModalMode | null
    name: string
    onNameChange: (name: string) => void
    onClose: () => void
    onSave: () => void
}

function EqualizerPresetModal({
    mode,
    name,
    onNameChange,
    onClose,
    onSave,
}: EqualizerPresetModalProps) {
    const { t } = useTranslation()

    return (
        <Modal isOpen={mode !== null} onClose={onClose}>
            <div className="w-[520px] px-[32px] py-[56px]">
                <div className="flex flex-col gap-[28px]">
                    <h3 className="text-[36px] uppercase text-orange-main">
                        {mode === "rename" ? t("equalizer.renamePreset") : t("equalizer.createPreset")}
                    </h3>
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => onNameChange(event.target.value)}
                        placeholder={t("equalizer.presetNamePlaceholder")}
                        className="w-full rounded-[8px] bg-black-main px-[16px] py-[14px] text-[22px] text-white-main outline-none"
                    />
                    <div className="ml-auto flex gap-[12px]">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-[8px] border border-orange-main bg-black-main px-[18px] py-[10px] text-[18px] uppercase text-white-main transition-colors duration-200 hover:text-orange-main cursor-pointer"
                        >
                            {t("actions.cancel")}
                        </button>
                        <button
                            type="button"
                            onClick={onSave}
                            className="rounded-[8px] border border-orange-main bg-orange-main px-[18px] py-[10px] text-[18px] uppercase text-black-main transition-colors duration-200 cursor-pointer"
                        >
                            {t("actions.save")}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default EqualizerPresetModal
