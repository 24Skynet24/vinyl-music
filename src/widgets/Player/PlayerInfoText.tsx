import { PlayerInfoTextProps } from "./model/types"

function PlayerInfoText ({title, artist, album, year}: PlayerInfoTextProps) {
    return (
        <article className="max-w-[986px] flex flex-col gap-[16px]">
            <h1 className="uppercase text-white-main text-[96px] select-none">
                {title}
            </h1>
            {artist && (
                <h2 className="text-orange-main uppercase text-[48px] select-none">
                    {artist}
                </h2>
            )}
            {(album || year) && (
                <h3 className="text-gray-main text-[24px] flex items-center gap-[10px] uppercase select-none">
                    {album && <span>{album}</span>}

                    {album && year && (
                        <span className="block w-[10px] h-[10px] rounded-full bg-gray-main select-none" />
                    )}

                    {year && <span className="select-none">{year}</span>}
                </h3>
            )}
        </article>
    )
}

export default PlayerInfoText