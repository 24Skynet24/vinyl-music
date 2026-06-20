import { APP_VERSION } from "../model/constants"

function Footer() {
    return (
        <footer className="w-full">
            <div className="w-full flex items-center justify-end px-[16px]">
                <span className="font-futura text-[14px] text-white-main">
                    {APP_VERSION}
                </span>
            </div>
        </footer>
    )
}

export default Footer