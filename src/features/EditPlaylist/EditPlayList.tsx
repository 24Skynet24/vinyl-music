import Modal from "../../shared/ui/Modal/Modal"
import cover from "../../shared/assets/img/cover-2.png"
import TextButton from "../../shared/ui/Buttons/TextButton"

function EditPlayList () {
    // const { isOpen, closeEditModal } = useEditTrackStore()

    return (
        <Modal isOpen={true} onClose={() => {}}>
            <div className="w-[900px] h-[500px] flex justify-center pt-[64px]">
                <div className="px-[32px] pb-[32px] flex flex-col justify-between">
                    <div className="flex gap-[32px]">
                        <div className="w-[200px] h-[200px] cursor-pointer">
                            <img src={cover} alt="" className="w-full h-full"/>
                        </div>
                        
                        <div className="flex flex-col w-[600px] gap-[16px] pt-[16px] text-white-main font-futura text-[24px]">
                            <input type="text" className="w-full px-[16px] py-[16px] bg-black-main rounded-[8px] outline-none" placeholder="Playlist..."/>

                            <input type="text" className="w-full px-[16px] py-[16px] bg-black-main rounded-[8px] outline-none" placeholder="Description..."/>
                        </div>
                    </div>

                    <div className="flex items-center gap-[16px] ml-auto">
                        <TextButton onClick={() => {}} text="cancel"/>
                        <TextButton onClick={() => {}} text="Save"/>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default EditPlayList