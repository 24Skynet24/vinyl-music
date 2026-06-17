import PlayListItem from "../../shared/ui/Listes/PlayListItem"
import Modal from "../../shared/ui/Modal/Modal"

function EditTrack () {
    // const { isOpen, closeEditModal } = useEditTrackStore()

    return (
        <Modal isOpen={true} onClose={() => {}}>
            <div className="w-[800px] min-h-[500px] max-h-[700px] flex justify-center pt-[64px]">
                <ul className="w-full px-[32px] overflow-y-auto overflow-x-hidden flex flex-col gap-[32px] pb-[32px]">
                    <li>
                        <PlayListItem
                            id={0}
                            title="All musics"
                            musicCount={0}
                            isSelected={true}
                            description="All your musics"
                            isEditTrack={true}
                            isHaveTrack={true}
                            onEdit={() => {}}
                        />
                    </li>
                    <li>
                        <PlayListItem
                            id={0}
                            title="All musics"
                            musicCount={0}
                            isSelected={true}
                            description="All your musics"
                            isEditTrack={true}
                            isHaveTrack={false}
                            onEdit={() => {}}
                        />
                    </li>
                </ul>
            </div>
        </Modal>
    )
}

export default EditTrack