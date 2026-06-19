import PlayListTrack from "../../../shared/ui/Lists/PlayListTrack"
import SelectAddMusic from "../../../shared/ui/Selects/SelectAddMusic"
import TextButton from "../../../shared/ui/Buttons/TextButton"
import { SlidingPanelAddMusicsProps } from "../model/types"

function SlidingPanelAddMusics({ onCancel, onSave }: SlidingPanelAddMusicsProps) {
    return (
        // <SelectAddMusic />
        <div className="flex flex-col gap-[32px]">
            <div className="flex items-center justify-center relative w-full h-[64px] pt-[8px] border-orange-main border-2 border-dashed cursor-pointer">
                <span className="text-[36px] text-orange-main uppercase text-center select-none">
                    add new music
                </span>
                <input 
                    type="file" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    accept="audio/*"
                    multiple
                    onChange={() => {}}
                />
            </div>

            <ul className="flex flex-col gap-[32px] max-h-[71vh] overflow-y-auto pb-[16px]">
                {
                    Array.from({ length: 10 }).map((_, index) => (
                        <li key={index}>
                            <PlayListTrack
                                isNewTrack={true}
                                id="1"
                                title="Track 1"
                                duration={120}
                            />
                        </li>
                    ))
                }
            </ul>

            <div className="ml-auto flex items-center gap-[16px]">
                <TextButton onClick={onCancel} text="cancel"/>
                <TextButton onClick={onSave} text="Save"/>
            </div>
        </div>
    )
}

export default SlidingPanelAddMusics