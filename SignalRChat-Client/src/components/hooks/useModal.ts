import { useState } from "react"

const useModal = () => {
    const [isOpenModal, setModalOpen] = useState<boolean>(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    return { isOpenModal, openModal, closeModal };
}

export default useModal;