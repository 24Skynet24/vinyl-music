function HeaderLogo () {
    return (
        <div className="text-white-main flex flex-col items-end w-[135px] select-none pointer-events-none">
            <div className="flex items-center">
                <div className="w-[49px] h-[62px]">
                    <svg className="w-full h-full" viewBox="0 0 49 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.2488 61.5L6.86646e-05 0L48.4975 0L24.2488 61.5Z" fill="#FFFEE9"/>
                    </svg>
                </div>
                <span className="font-futura text-[64px]">
                    inyl
                </span>
            </div>
            <span className="font-futura text-[32px] leading-0 tracking-[10px] translate-x-[40px]">
                Music
            </span>
        </div>
    )
}

export default HeaderLogo