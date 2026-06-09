import { PlayButtonProps } from "./types"

function PlayButton({ isPlaying, onClick }: PlayButtonProps) {
  const buttonStyles = `
    w-[64px] h-[64px] flex items-center justify-center 
    border-4 outline-none cursor-pointer press-btn transition-colors duration-200 shadow-[0_0_10px_#d7452c]
    ${isPlaying ? 'bg-orange-main border-black-main' : 'bg-black-main border-orange-main'}
  `.trim();

  return (
    <button 
      onClick={onClick} 
      className={buttonStyles}
    >
      <svg 
        className="w-full h-full" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {isPlaying ? (
          <>
            <path d="M12 6.66675H9.33333C8.59695 6.66675 8 7.2637 8 8.00008V24.0001C8 24.7365 8.59695 25.3334 9.33333 25.3334H12C12.7364 25.3334 13.3333 24.7365 13.3333 24.0001V8.00008C13.3333 7.2637 12.7364 6.66675 12 6.66675Z" fill="#181818"/>
            <path d="M22.6666 6.66675H20C19.2636 6.66675 18.6666 7.2637 18.6666 8.00008V24.0001C18.6666 24.7365 19.2636 25.3334 20 25.3334H22.6666C23.403 25.3334 24 24.7365 24 24.0001V8.00008C24 7.2637 23.403 6.66675 22.6666 6.66675Z" fill="#181818"/>
          </>
        ) : (
          <path d="M10.6666 6.85327V25.5199L25.3333 16.1866L10.6666 6.85327Z" fill="#D7452C"/>
        )}
      </svg>
    </button>
  );
}

export default PlayButton;