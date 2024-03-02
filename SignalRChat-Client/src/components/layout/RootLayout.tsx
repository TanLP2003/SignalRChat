import { Outlet } from "react-router-dom";
import NavBar from "../common/NavBar";
import useModal from "../hooks/useModal";
import ProfileModal from "../common/ProfileModal";
import ConfirmModal from "../common/ConfirmModal";
import ChangePasswordModal from "../common/ChangePasswordModal";
import Login from "../../pages/Home/Login";
import SignUp from "../../pages/Home/SignUp";

const RootLayout: React.FC = () => {
    const {
        isOpenModal: isProfileModalOpen,
        openModal: openProfileModal,
        closeModal: closeProfileModal
    } = useModal();

    const {
        isOpenModal: isConfirmModalOpen,
        openModal: openConfirmModal,
        closeModal: closeConfirmModal
    } = useModal();
    const {
        isOpenModal: isChangePasswordModalOpen,
        openModal: openChangePasswordModal,
        closeModal: closeChangePasswordModal
    } = useModal();
    const {
        isOpenModal: isLoginModalOpen,
        openModal: openLoginModal,
        closeModal: closeLoginModal
    } = useModal();
    const {
        isOpenModal: isSignUpModalOpen,
        openModal: openSignUpModal,
        closeModal: closeSignUpModal
    } = useModal();
    return (
        <div>
            <NavBar openConfirmModal={openConfirmModal}
                openProfileModal={openProfileModal}
                openChangePasswordModal={openChangePasswordModal}
                openLoginModal={openLoginModal}
                openSignUpModal={openSignUpModal}
            />

            <Outlet />
            {isProfileModalOpen && <ProfileModal closeModal={closeProfileModal} />}
            {isConfirmModalOpen && <ConfirmModal closeConfirmModal={closeConfirmModal} />}
            {isChangePasswordModalOpen && <ChangePasswordModal closeChangePasswordModal={closeChangePasswordModal} />}
            {isLoginModalOpen && <Login openSignUpModal={openSignUpModal} closeLoginModal={closeLoginModal} />}
            {isSignUpModalOpen && <SignUp closeSignUpModal={closeSignUpModal} />}
        </div>
    )
}

export default RootLayout;