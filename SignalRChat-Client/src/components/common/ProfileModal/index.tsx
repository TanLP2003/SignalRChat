import { IoMdClose } from 'react-icons/io';
import './ProfileModal.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import useModal from '../../hooks/useModal';
import ModifyModal from '../ModifyModal';
import ChangePasswordModal from '../ChangePasswordModal';
import DragDropModal from '../Drag&DropModal';

interface ProfileModalProps {
    closeModal: Function
}

const ProfileModal: React.FC<ProfileModalProps> = ({ closeModal }) => {
    const user = useSelector((state: RootState) => state.users.user);
    const {
        isOpenModal: isModifyModalOpen,
        openModal: openModifyModal,
        closeModal: closeModifyModal
    } = useModal();

    const {
        isOpenModal: isDragDropModalOpen,
        openModal: openDragDropModal,
        closeModal: closeDragDropModal
    } = useModal();

    return (
        <>
            <div className="modal-overlay">
                <div className="modal">
                    <div className='modal-header'>
                        <p className='modal-header-title'>Profile</p>
                        <IoMdClose className='modal-icon' onClick={() => closeModal()} />
                    </div>
                    <div className='profile'>
                        <img src={user?.avatar} alt="" />
                        <div className='profile-info'>
                            <p><strong>Name:</strong> {user!.firstName} {user!.lastName}</p>
                            <p><strong>Username:</strong> {user!.userName}</p>
                            <p><strong>Email:</strong> {user!.email}</p>
                            <p><strong>Phone Number:</strong> {user!.phoneNumber}</p>
                        </div>
                    </div>
                    <div className='modal-btn'>
                        <div onClick={() => openDragDropModal()}>
                            Change Avatar
                        </div>
                        <div onClick={() => openModifyModal()}>
                            Modify
                        </div>
                    </div>
                </div>
            </div>
            {isModifyModalOpen && <ModifyModal closeModifyModal={closeModifyModal} />}
            {isDragDropModalOpen && <DragDropModal closeDragDropModal={closeDragDropModal} />}
        </>
    )
}

export default ProfileModal;