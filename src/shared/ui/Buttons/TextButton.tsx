import { TextButtonProps } from "./types"

function TextButton ({text, onClick, minWidth}: TextButtonProps) {
    return (
        <button 
            className="text-btn press-btn"
            style={{ minWidth: minWidth ? `${minWidth}px` : '130px' }}
            onClick={onClick}
        >
            <div className="text-white-main text-[32px]">
                {text}
            </div>
            <span/>
        </button>
    )
}

export default TextButton