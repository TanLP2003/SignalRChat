import { useSelector } from 'react-redux';
import './NavBar.scss';
import { RootState } from '../../../redux';
import logo from '../../../assets/img/chat_724698.png';
import { IoIosArrowDropdown } from 'react-icons/io';
import Dropdown from './Dropdown';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

interface NavBarProps {
    openLoginModal: Function,
    openSignUpModal: Function,
    openProfileModal: Function,
    openConfirmModal: Function,
    openChangePasswordModal: Function
}

const NavBar: React.FC<NavBarProps> = ({ openConfirmModal,
    openProfileModal,
    openChangePasswordModal,
    openLoginModal,
    openSignUpModal
}) => {
    const [isOpened, setOpen] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.users.user);
    const handledClickDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setOpen(prev => !prev);
    }
    const location = useLocation();
    return (
        <div className='navbar-wrapper'>
            <div className='navbar'>
                <div className='navbar-logo'>
                    <img src={logo} alt="" />
                    <span>SignalRChat</span>
                </div>
                <div className='navbar-section'>
                    {location.pathname === '/'
                        ? (
                            <>
                                <a href="#landing">Home</a>
                                <a href='#feature'>Features</a>
                            </>
                        ) : (
                            <div></div>
                        )
                    }
                </div>
                {user ?
                    (
                        <div className='user-avatar' onClick={handledClickDropdown}>
                            <img src={user?.avatar} alt="" />
                            <div>
                                <p>{user?.userName}</p>
                                <IoIosArrowDropdown />
                            </div>
                        </div>
                    )
                    : (
                        <div className='navbar-btn navbar-btn-login' onClick={() => openLoginModal()}>Login</div>
                    )
                }
            </div>
            {isOpened && <Dropdown
                setOpenDropdown={setOpen}
                openConfirmModal={openConfirmModal}
                openProfileModal={openProfileModal}
                openChangePasswordModal={openChangePasswordModal}
            />
            }
        </div>
    )
}

export default NavBar;