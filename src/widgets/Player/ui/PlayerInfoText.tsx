import { PlayerInfoTextType } from "../types"

function PlayerInfoText ({musicName, authorName, albumName, year}: PlayerInfoTextType) {
    return (
        <article className="max-w-[986px] flex flex-col gap-[16px]">
            <h1 className="uppercase text-white-main text-[96px]">
                {musicName}
            </h1>
            {authorName && (
                <h2 className="text-orange-main uppercase text-[48px]">
                    {authorName}
                </h2>
            )}
            {(albumName || year) && (
                <h3 className="text-gray-main text-[24px] flex items-center gap-[10px] uppercase">
                    {albumName && <span>{albumName}</span>}

                    {albumName && year && (
                        <span className="block w-[10px] h-[10px] rounded-full bg-gray-main" />
                    )}

                    {year && <span>{year}</span>}
                </h3>
            )}
        </article>
    )
}

export default PlayerInfoText