import { PlayListItemProps } from "./types"
import { formatTime } from "../../lib"

import cover from "../../assets/img/cover.png"

function PlayListItem ({title, duration, isSelected, img, authorName, albumName, onClick}: PlayListItemProps) {
    return (
        <div className="w-full h-[64px] bg-black-main cursor-pointer select-none" onClick={onClick}>
            <div className="flex items-center justify-between w-full h-full text-white-main pr-[24px]">
                <div className="flex items-center gap-[16px]">
                    <div className="w-[64px] h-full">
                        <img src={img ? img : cover} alt="" />
                    </div>
                    <div className="max-w-[500px]">
                        <h5 className={`${isSelected && "text-orange-main"} text-[24px] text-hidden`}>
                            {title}
                        </h5>
                        {authorName && 
                            <span className="text-gray-main text-[10px] text-hidden block">
                                {authorName}
                            </span>
                        }
                    </div>
                </div>

                {albumName && 
                    <span className="text-[20px] text-hidden max-w-[600px]">
                        {albumName}
                    </span>
                }

                <span className="text-[24px]">
                    {formatTime(duration)}
                </span>
            </div>
        </div>
    )
}

export default PlayListItem