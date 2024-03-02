import React, { useEffect, useRef } from 'react';
import './Dropdown.scss';
import { useLocation, useNavigate } from 'react-router-dom';

interface DropdownProps {
    setOpenDropdown: Function,
    openProfileModal: Function,
    openConfirmModal: Function,
    openChangePasswordModal: Function
}

const Dropdown: React.FC<DropdownProps> = ({ setOpenDropdown, openConfirmModal, openProfileModal, openChangePasswordModal }) => {
    const dropdownRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current!.contains(event.target)) {
                setOpenDropdown(false)
            }
        }
        console.log('Adding event listener');
        window.addEventListener('click', handleClick);
        return () => {
            console.log('Removing event listener');
            window.removeEventListener('click', handleClick);
        }
    }, [])
    return (
        <div className='dropdown-container' ref={dropdownRef}>
            <ul className='dropdown-list'>
                {
                    location.pathname === '/'
                        ? (
                            <li onClick={() => {
                                navigate('/chat')
                                setOpenDropdown(false);
                            }}>Chat</li>
                        ) : (
                            <li onClick={() => {
                                navigate("/");
                                setOpenDropdown(false);
                            }}>Home</li>
                        )
                }
                <li onClick={() => {
                    setOpenDropdown(false);
                    openProfileModal();
                }}>
                    Profile
                </li>
                <li onClick={() => {
                    setOpenDropdown(false);
                    openChangePasswordModal();
                }}>
                    Change Password
                </li>
                <li onClick={() => {
                    setOpenDropdown(false);
                    openConfirmModal();
                }}>
                    Logout
                </li>
            </ul>
        </div>
    )
}

export default Dropdown;