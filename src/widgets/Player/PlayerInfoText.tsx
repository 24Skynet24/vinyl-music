import { PlayerInfoTextProps } from "./model/types"

function PlayerInfoText ({title, artist, album, year}: PlayerInfoTextProps) {
    return (
        <article className="min-[1850px]:w-[986px] min-[1440px]:w-[40vw] w-[550px] flex flex-col gap-[16px]">
            <h1 className="uppercase text-white-main text-[42px] min-[1440px]:text-[64px] min-[1850px]:text-[84px] min-[1850px]:min-h-[252px] min-[1440px]:min-h-[192px] min-h-[126px] select-none text-hidden-multiline">
                {title}
            </h1>
            {artist && (
                <h2 className="text-orange-main uppercase min-[1560px]:text-[48px] text-[36px] select-none text-hidden">
                    {artist}
                </h2>
            )}
            {(album || year) && (
                <h3 className="text-gray-main text-[24px] flex items-center gap-[10px] uppercase select-none">
                    {album && <span className="text-hidden max-w-[70%]">{album}</span>}

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