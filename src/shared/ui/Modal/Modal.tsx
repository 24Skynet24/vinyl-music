import { useEffect, useState } from "react"
import { ModalProps } from "./types"

function Modal ({isOpen, children, onClose}: ModalProps) {
    const MODAL_ANIMATION_MS = 250
    const [isRendered, setIsRendered] = useState(isOpen)
    const [isClosing, setIsClosing] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsRendered(true)
            setIsClosing(false)
            return
        }

        if (!isRendered) return

        setIsClosing(true)
        const timeoutId = window.setTimeout(() => {
            setIsRendered(false)
            setIsClosing(false)
        }, MODAL_ANIMATION_MS)

        return () => window.clearTimeout(timeoutId)
    }, [isOpen, isRendered])

    if (!isRendered) return null
    
    return (
        <div className={`fixed left-0 top-0 w-screen h-screen bg-black-main/80 z-300 ${isClosing ? "fade-hide" : "fade-show"}`} onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()} className={`bg-gradient-1 min-w-[400px] min-h-[300px] rounded-[16px] absolute left-1/2 top-1/2 -translate-1/2`}>
                <div className="absolute right-[3%] top-[5%] cursor-pointer w-[18px] h-[18px]" onClick={onClose}>
                    <svg className="w-full h-full" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_99_21)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M31.2113 3.05133C31.5114 2.75126 31.68 2.34427 31.68 1.91991C31.68 1.49554 31.5114 1.08855 31.2113 0.788477C30.9113 0.488404 30.5043 0.319824 30.0799 0.319824C29.6555 0.319824 29.2486 0.488404 28.9485 0.788477L15.9999 13.7371L3.05133 0.788477C2.75126 0.488404 2.34427 0.319824 1.91991 0.319824C1.49554 0.319824 1.08855 0.488404 0.788477 0.788477C0.488404 1.08855 0.319824 1.49554 0.319824 1.91991C0.319824 2.34427 0.488404 2.75126 0.788477 3.05133L13.7371 15.9999L0.788477 28.9485C0.488404 29.2486 0.319824 29.6555 0.319824 30.0799C0.319824 30.5043 0.488404 30.9113 0.788477 31.2113C1.08855 31.5114 1.49554 31.68 1.91991 31.68C2.34427 31.68 2.75126 31.5114 3.05133 31.2113L15.9999 18.2628L28.9485 31.2113C29.2486 31.5114 29.6555 31.68 30.0799 31.68C30.5043 31.68 30.9113 31.5114 31.2113 31.2113C31.5114 30.9113 31.68 30.5043 31.68 30.0799C31.68 29.6555 31.5114 29.2486 31.2113 28.9485L18.2628 15.9999L31.2113 3.05133Z" fill="#d7452c"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_99_21">
                                <rect width="32" height="32" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>

                {children}
            </div>
        </div>
    )
}

export default Modal