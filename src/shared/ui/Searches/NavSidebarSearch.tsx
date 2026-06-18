import { NavSidebarSearchProps } from "./types"

function NavSidebarSearch ({onSearch, onSort}: NavSidebarSearchProps) {
    return (
        <article className="bg-black-main w-full px-[16px] py-[9px] flex items-center justify-between gap-[16px] rounded-[8px]">
            <div className="w-[32px] h-[32px] cursor-pointer" onClick={onSearch}>
                <svg className="w-full h-full" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.9801 26.8721L17.6307 18.5227C16.9641 19.0907 16.1974 19.5303 15.3307 19.8414C14.4641 20.1525 13.5929 20.3081 12.7174 20.3081C10.5858 20.3081 8.77961 19.5676 7.29873 18.0867C5.81784 16.6049 5.07739 14.7983 5.07739 12.6667C5.07739 10.5352 5.81784 8.72895 7.29873 7.24806C8.77961 5.76717 10.5858 5.02628 12.7174 5.02539C14.8489 5.0245 16.6556 5.76539 18.1374 7.24806C19.6192 8.73072 20.3596 10.5369 20.3587 12.6667C20.3587 13.5929 20.1947 14.4894 19.8667 15.3561C19.5387 16.2227 19.1076 16.9641 18.5734 17.5801L26.9227 25.9281L25.9801 26.8721ZM12.7187 18.9734C14.4876 18.9734 15.9809 18.3645 17.1987 17.1467C18.4165 15.9289 19.0254 14.4352 19.0254 12.6654C19.0254 10.8956 18.4165 9.40228 17.1987 8.18539C15.9809 6.9685 14.4876 6.35961 12.7187 6.35872C10.9498 6.35784 9.45606 6.96672 8.23739 8.18539C7.01873 9.40406 6.40984 10.8974 6.41073 12.6654C6.41161 14.4334 7.0205 15.9267 8.23739 17.1454C9.45428 18.3641 10.9476 18.9729 12.7174 18.9721" fill="#FFFEE9"/>
                </svg>
            </div>

            <div className="flex-1">
                <input
                    className="w-full h-full placeholder:text-white-main text-white-main outline-none text-[18px] font-futura border-b"
                    type="text"
                    placeholder="Search (title, artist or album)..."
                />
            </div>
            
            <div className="w-[32px] h-[32px] cursor-pointer" onClick={onSort}>
                <svg className="w-full h-full" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 24V21.3333H12V24H4ZM4 17.3333V14.6667H20V17.3333H4ZM4 10.6667V8H28V10.6667H4Z" fill="#FFFEE9"/>
                </svg>
            </div>
        </article>
    )
}

export default NavSidebarSearch