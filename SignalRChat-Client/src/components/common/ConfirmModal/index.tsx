import { IoMdClose } from 'react-icons/io';
import './ConfirmModal.scss';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user-action';

interface ConfirmModalProps {
    closeConfirmModal: Function
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ closeConfirmModal }) => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogoutClick = async () => {
        await dispatch(logout());
        navigate('/');
        console.log(window.location);
        window.location.reload();
    }
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className='modal-header'>
                    <p className='modal-header-title'>Logout</p>
                    <IoMdClose className='modal-icon' onClick={() => closeConfirmModal()} />
                </div>
                <div className='confirm'>
                    <p>Are you sure to logout?</p>
                    <div className='modal-btn'>
                        <div onClick={() => {
                            closeConfirmModal();
                            handleLogoutClick();
                        }}>Yes</div>
                        <div onClick={() => closeConfirmModal()}>No</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal;