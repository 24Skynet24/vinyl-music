interface EqualizerPresetActionsProps {
    hasSelectedCustomPreset: boolean
    onCreate: () => void
    onRename: () => void
    onDelete: () => void
    onReset: () => void
}

function EqualizerPresetActions({
    hasSelectedCustomPreset,
    onCreate,
    onRename,
    onDelete,
    onReset,
}: EqualizerPresetActionsProps) {
    const actionButtonClassName = "press-btn rounded-[8px] border border-orange-main bg-black-main px-[18px] py-[10px] text-[18px] uppercase text-white-main transition-colors duration-200 hover:enabled:text-orange-main disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"

    return (
        <footer className="flex flex-col gap-[16px]">
            <p className="text-[16px] text-gray-main font-futura">
                Boosting many bands can make audio louder and distorted. Custom presets are saved automatically
            </p>

            <div className="flex flex-wrap items-center gap-[12px]">
                <button
                    type="button"
                    onClick={onCreate}
                    className={actionButtonClassName}
                >
                    Save as preset
                </button>
                <button
                    type="button"
                    onClick={onRename}
                    disabled={!hasSelectedCustomPreset}
                    className={actionButtonClassName}
                >
                    Rename
                </button>
                <button
                    type="button"
                    onClick={onDelete}
                    disabled={!hasSelectedCustomPreset}
                    className={actionButtonClassName}
                >
                    Delete
                </button>
                <button
                    type="button"
                    onClick={onReset}
                    className={actionButtonClassName}
                >
                    Reset
                </button>
            </div>
        </footer>
    )
}

export default EqualizerPresetActions
