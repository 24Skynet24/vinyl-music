import { useNavigationStore } from "../../../features/Navigation/model/navigationStore"
import { NavigationSidebarItemType } from "../model/types"
import NavSidebarButton from "../../../shared/ui/Buttons/NavSidebarButton"
import { useTranslation } from "react-i18next"
import { AppLanguage, LANGUAGE_STORAGE_KEY, isAppLanguage } from "../../../shared/i18n"

function NavigationSidebar () {
    const openPanel = useNavigationStore((state) => state.openPanel)
    const { t, i18n } = useTranslation()
    const currentLanguage = isAppLanguage(i18n.language) ? i18n.language : "en"
    const nextLanguage: AppLanguage = currentLanguage === "en" ? "ru" : "en"
    const navItems: NavigationSidebarItemType[] = [
        {
            id: 1,
            name: t("navigation.musics"),
            isPlaying: true,
            view: "musics",
        },
        {
            id: 2,
            name: t("navigation.playlists"),
            isPlaying: false,
            view: "playlists",
        },
        {
            id: 3,
            name: t("navigation.addMusic"),
            isPlaying: false,
            view: "add-music",
        },
        {
            id: 4,
            name: t("navigation.equalizer"),
            isPlaying: false,
            view: "equalizer",
        },
    ]

    const handleToggleLanguage = () => {
        i18n.changeLanguage(nextLanguage)
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage)
    }

    return (
        // <aside className="h-[650px] min-[1440px]:h-[700px] min-[1800px]:h-[850px] p-[16px] bg-black-main/30 flex flex-col gap-[32px] items-center rounded-[16px]">
        <aside className="h-[calc(100%-10vh)] p-[16px] bg-black-main/30 flex flex-col gap-[48px] items-center rounded-[16px]">
            <ul className="flex flex-col items-center gap-[32px] h-full">
                {navItems.map((item) => (
                    <li key={item.id}>
                        <NavSidebarButton
                            onClick={() => openPanel(item.view)}
                            view={item.view}
                            title={item.name}
                        />
                    </li>
                ))}
                <li className="mt-auto">
                    <button
                        type="button"
                        onClick={handleToggleLanguage}
                        className="cursor-pointer border-orange-main border-2 pt-[12px] pb-[8px] px-[16px] rounded-[8px] press-btn"
                    >
                        <span className="text-[32px] text-white-main uppercase">
                            {t("language.toggle")}
                        </span>
                    </button>
                </li>
            </ul>
        </aside>
    )
}

export default NavigationSidebar