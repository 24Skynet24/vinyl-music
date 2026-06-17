import { TextButtonProps } from "./types"

function TextButton ({text}: TextButtonProps) {
    return (
        <button className="text-btn press-btn">
            <div className="text-white-main text-[32px]">
                {text}
            </div>
            <span/>
        </button>
    )
}

export default TextButton