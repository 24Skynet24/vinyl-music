import diskPlus from "../../assets/icons/disk-plus.svg"
import { SelectAddMusicProps } from "./types"

function SelectAddMusic({ onSelect }: SelectAddMusicProps) {
    return (
        <article
            className="w-[772px] h-[500px] border-dashed border-2 border-orange-main flex items-center justify-center relative cursor-pointer"
            onClick={onSelect}
        >
            <div className="flex flex-col items-center gap-[50px]">
                <div className="flex items-center">
                    <img src={diskPlus} alt="disk-plus" className="object-cover w-full h-full"/>
                </div>
                <div className="flex flex-col items-center gap-[16px]">
                    <h4 className="text-[64px] text-orange-main uppercase">
                        Select your music
                    </h4>
                    <span className="text-[36px] text-gray-main">
                        or drop your file here
                    </span>
                </div>
            </div>

        </article>
    )
}

export default SelectAddMusic