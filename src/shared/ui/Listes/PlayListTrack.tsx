import { PlayListTrackProps } from "./types"
import { formatTime } from "../../lib"

import cover from "../../assets/img/cover.png"

function PlayListTrack ({title, duration, isSelected, img, artist, album, onClick, editPlaylist}: PlayListTrackProps) {
    return (
        <div className="w-full h-[64px] bg-black-main select-none">
            <div className="flex items-center justify-between w-full h-full text-white-main">
                <div className="flex-1 flex items-center justify-between cursor-pointer mr-[16px]" onClick={onClick}>
                    <div className="flex items-center gap-[16px] cursor-pointer">
                        <div className="w-[64px] h-full">
                            <img src={img ? img : cover} alt="" />
                        </div>

                        <div className="w-[357px]">
                            <h5 className={`${isSelected && "text-orange-main"} text-[24px] text-hidden`}>
                                {title}
                            </h5>
                            {artist && 
                                <span className="text-gray-main text-[10px] text-hidden block">
                                    {artist}
                                </span>
                            }
                        </div>
                    </div>

                    {album && 
                        <span className="text-[20px] text-hidden w-[260px]">
                            {album}
                        </span>
                    }
                </div>

                <div className="flex items-center gap-[16px] pr-[24px] py-[16px]">
                    <span className="text-[24px]">
                        {formatTime(duration)}
                    </span>

                    <div className="w-[32px] h-[32px] cursor-pointer" onClick={editPlaylist}>
                        <svg className="w-full h-full" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.0001 26.8801C9.98412 26.8801 5.12012 22.0161 5.12012 16.0001C5.12012 9.98412 9.98412 5.12012 16.0001 5.12012C22.0161 5.12012 26.8801 9.98412 26.8801 16.0001C26.8801 22.0161 22.0161 26.8801 16.0001 26.8801ZM16.0001 6.40012C10.6881 6.40012 6.40012 10.6881 6.40012 16.0001C6.40012 21.3121 10.6881 25.6001 16.0001 25.6001C21.3121 25.6001 25.6001 21.3121 25.6001 16.0001C25.6001 10.6881 21.3121 6.40012 16.0001 6.40012Z" fill="#FFFEE9"/>
                            <path d="M10.24 15.3599H21.76V16.6399H10.24V15.3599Z" fill="#FFFEE9"/>
                            <path d="M15.3601 10.2402H16.6401V21.7602H15.3601V10.2402Z" fill="#FFFEE9"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayListTrack