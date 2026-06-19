import diskPlus from "../../assets/icons/disk-plus.svg"

function SelectAddMusic() {
    return (
        <article className="w-[772px] h-[500px] border-dashed border-2 border-orange-main flex items-center justify-center relative cursor-pointer">
            <div className="flex flex-col items-center gap-[50px]">
                <div className="flex items-center">
                    <img src={diskPlus} alt="disk-plus" />
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

            <input 
                type="file" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                accept="audio/*"
                multiple
                onChange={() => {}}
            />
        </article>
    )
}

export default SelectAddMusic