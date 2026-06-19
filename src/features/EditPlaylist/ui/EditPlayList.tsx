import { useEffect, useState } from "react"
import Modal from "../../../shared/ui/Modal/Modal"
import cover from "../../../shared/assets/img/cover-2.png"
import TextButton from "../../../shared/ui/Buttons/TextButton"
import { EditPlayListProps } from "../types"
import { usePlaylistStore } from "../../../entities/playlist"

function EditPlayList ({ isOpen, onClose, playlistId }: EditPlayListProps) {
    const playlists = usePlaylistStore((state) => state.playlists)
    const addPlaylist = usePlaylistStore((state) => state.addPlaylist)
    const updatePlaylist = usePlaylistStore((state) => state.updatePlaylist)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [img, setImg] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (!isOpen) return

        const editing = playlistId
            ? playlists.find((playlist) => playlist.id === playlistId)
            : undefined

        setTitle(editing?.title ?? "")
        setDescription(editing?.description ?? "")
        setImg(editing?.img)
    }, [isOpen, playlistId, playlists])

    const handleImage = (files: FileList | null) => {
        if (!files || !files[0]) return
        setImg(URL.createObjectURL(files[0]))
    }

    const handleSave = () => {
        const trimmedTitle = title.trim()
        if (!trimmedTitle) return

        const data = {
            title: trimmedTitle,
            description: description.trim() || undefined,
            img,
        }

        if (playlistId) {
            updatePlaylist(playlistId, data)
        } else {
            addPlaylist(data)
        }

        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-[900px] h-[500px] flex justify-center pt-[64px]">
                <div className="px-[32px] pb-[32px] flex flex-col justify-between">
                    <div className="flex gap-[32px]">
                        <div className="w-[200px] h-[200px] cursor-pointer relative">
                            <div className="absolute top-0 left-0 w-full h-full bg-black-main/70 z-1 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                                <div className="w-[64px] h-[64px]">
                                    <svg className="w-full h-full" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.0001 10.6665C13.1067 10.6665 10.6667 13.1065 10.6667 15.9998C10.6667 18.8932 13.1067 21.3332 16.0001 21.3332C18.8934 21.3332 21.3334 18.8932 21.3334 15.9998C21.3334 13.1065 18.8934 10.6665 16.0001 10.6665ZM16.0001 18.6665C14.5734 18.6665 13.3334 17.4265 13.3334 15.9998C13.3334 14.5732 14.5734 13.3332 16.0001 13.3332C17.4267 13.3332 18.6667 14.5732 18.6667 15.9998C18.6667 17.4265 17.4267 18.6665 16.0001 18.6665Z" fill="#D7452C"/>
                                        <path d="M26.6666 6.66653H23.2132L19.5999 3.05319C19.4753 2.92962 19.3275 2.83185 19.1651 2.7655C19.0026 2.69915 18.8287 2.66551 18.6532 2.66653H13.3199C12.9599 2.66653 12.6266 2.81319 12.3732 3.05319L8.75989 6.66653H5.30656C3.83989 6.66653 2.63989 7.86653 2.63989 9.33319V23.9999C2.63989 25.4665 3.83989 26.6665 5.30656 26.6665H26.6399C28.1066 26.6665 29.3066 25.4665 29.3066 23.9999V9.33319C29.3066 7.86653 28.1066 6.66653 26.6399 6.66653H26.6666ZM26.6666 23.9999H5.33323V9.33319H9.33323C9.69323 9.33319 10.0266 9.18653 10.2799 8.94653L13.8932 5.33319H18.1199L21.7332 8.94653C21.9866 9.19986 22.3199 9.33319 22.6799 9.33319H26.6799V23.9999H26.6666Z" fill="#D7452C"/>
                                    </svg>
                                </div>
                            </div>

                            <img src={img ?? cover} alt="" className="w-full h-full relative z-0 object-cover"/>

                            <input
                                type="file"
                                accept="image/*"
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-2"
                                onChange={(event) => handleImage(event.target.files)}
                            />
                        </div>
                        
                        <div className="flex flex-col w-[600px] gap-[16px] pt-[16px] text-white-main font-futura text-[24px]">
                            <input
                                type="text"
                                className="w-full px-[16px] py-[16px] bg-black-main rounded-[8px] outline-none"
                                placeholder="Playlist..."
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />

                            <input
                                type="text"
                                className="w-full px-[16px] py-[16px] bg-black-main rounded-[8px] outline-none"
                                placeholder="Description..."
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-[16px] ml-auto">
                        <TextButton onClick={onClose} text="cancel"/>
                        <TextButton onClick={handleSave} text="Save"/>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default EditPlayList
