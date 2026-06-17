import { PlayListItemProps } from "./types"
import cover from "../../assets/img/cover-2.png"

function PlayListItem ({img, title, isSelected, musicCount, description, onDelete, onEdit}: PlayListItemProps) {
    return (
        <article className="w-full h-[200px] flex items-center gap-[16px] text-white-main">
            <div className="flex h-full gap-[16px] flex-1 cursor-pointer">
                <div className="h-full w-[200px]">
                    <img src={img ? img : cover} alt="" className="w-full h-full"/>
                </div>

                <div className="flex flex-col h-full gap-[8px] max-w-[450px] py-[8px]">
                    <h6 className={`${isSelected ? 'text-orange-main' : 'text-white-main'} text-[32px]`}>
                        {title}
                    </h6>
                    { description && 
                        <span className="font-futura">
                            {description}
                        </span>
                    }
                    <span className="block mt-auto font-futura">
                        {musicCount || 0} musicks
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-[32px] h-full">
                <div className="w-[32px] h-[32px] cursor-pointer" onClick={onDelete}>
                    <svg className="w-full h-full" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_99_21)">
                            <path fill-rule="evenodd" clipRule="evenodd" d="M31.2113 3.05133C31.5114 2.75126 31.68 2.34427 31.68 1.91991C31.68 1.49554 31.5114 1.08855 31.2113 0.788477C30.9113 0.488404 30.5043 0.319824 30.0799 0.319824C29.6555 0.319824 29.2486 0.488404 28.9485 0.788477L15.9999 13.7371L3.05133 0.788477C2.75126 0.488404 2.34427 0.319824 1.91991 0.319824C1.49554 0.319824 1.08855 0.488404 0.788477 0.788477C0.488404 1.08855 0.319824 1.49554 0.319824 1.91991C0.319824 2.34427 0.488404 2.75126 0.788477 3.05133L13.7371 15.9999L0.788477 28.9485C0.488404 29.2486 0.319824 29.6555 0.319824 30.0799C0.319824 30.5043 0.488404 30.9113 0.788477 31.2113C1.08855 31.5114 1.49554 31.68 1.91991 31.68C2.34427 31.68 2.75126 31.5114 3.05133 31.2113L15.9999 18.2628L28.9485 31.2113C29.2486 31.5114 29.6555 31.68 30.0799 31.68C30.5043 31.68 30.9113 31.5114 31.2113 31.2113C31.5114 30.9113 31.68 30.5043 31.68 30.0799C31.68 29.6555 31.5114 29.2486 31.2113 28.9485L18.2628 15.9999L31.2113 3.05133Z" fill="#FFFEE9"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_99_21">
                                <rect width="32" height="32" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>

                <div className="w-[32px] h-[32px] cursor-pointer" onClick={onEdit}>
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.64654 34.3218L11.8415 32.5896C13.0685 32.1811 13.6813 31.9769 14.2576 31.703C14.9377 31.378 15.5805 30.9804 16.175 30.5171C16.6785 30.1244 17.1361 29.6668 18.0497 28.7532L31.5413 15.2632L33.009 13.7955C34.1766 12.6279 34.8326 11.0443 34.8326 9.39301C34.8326 7.74177 34.1766 6.15815 33.009 4.99055C31.8414 3.82295 30.2578 3.16699 28.6066 3.16699C26.9553 3.16699 25.3717 3.82295 24.2041 4.99055L22.7364 6.4583L9.24321 19.9483C8.32962 20.8635 7.87204 21.3211 7.47937 21.8246C7.01608 22.4191 6.61846 23.0619 6.29345 23.742C6.01954 24.3183 5.81529 24.9326 5.40679 26.1581L3.67462 31.3531M31.5413 15.2632C31.5413 15.2632 28.4237 15.0796 25.6719 12.3277C22.92 9.57747 22.738 6.4583 22.738 6.4583M6.64654 34.3218L5.3767 34.7461C5.08071 34.8454 4.76289 34.8601 4.45898 34.7887C4.15508 34.7172 3.87712 34.5624 3.65637 34.3416C3.43561 34.1209 3.28081 33.8429 3.20935 33.539C3.13789 33.2351 3.15262 32.9173 3.25187 32.6213L3.6762 31.3515L6.64654 34.3218Z" stroke="#FFFEE9" stroke-width="1.5"/>
                    </svg>
                </div>
            </div>
        </article>
    )
}

export default PlayListItem