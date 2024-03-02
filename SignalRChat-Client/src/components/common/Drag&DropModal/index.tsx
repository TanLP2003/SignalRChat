import { ChangeEvent, useEffect, useRef, useState } from "react"
import { IoMdClose } from "react-icons/io"
import { toast } from "react-toastify";
import './DragDropModal.scss';
import { AppDispatch } from "../../../redux";
import { useDispatch } from "react-redux";
import { encodeFileInChunks } from "../../../redux/config";
import { changeAvatar } from "../../../redux/actions/user-action";

interface DragDropModalProps {
    closeDragDropModal: Function
}

const DragDropModal: React.FC<DragDropModalProps> = ({ closeDragDropModal }) => {
    const dispatch: AppDispatch = useDispatch();
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files && e.target.files[0];
        const maxFileSize = 10 * 1024 * 1024;
        if (newFile) {
            console.log("choose image!");
            const type = newFile.type.split('/')[0];
            if (type === "image") {
                if (newFile.size <= maxFileSize) {
                    setFile(_ => newFile);
                } else toast.error('Max file upload is 10MB!');
            } else toast.error("Please upload a image file");
        }
    }
    const handleDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === 'dragover') {
            setDragActive(true);
        } else if (event.type === 'dragleave') {
            setDragActive(false);
        }
    };
    const handleDrop = (event) => {
        event.preventDefault();
        setDragActive(false);
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile && droppedFile.type.startsWith('image/')) {
            console.log(droppedFile);
            setFile(droppedFile);
        } else {
            toast.error('Please upload an image file.');
        }
    };
    useEffect(() => {
        document.addEventListener('dragover', handleDrag);
        document.addEventListener('dragleave', handleDrag);
        document.addEventListener('drop', handleDrop);

        return () => {
            document.removeEventListener('dragover', handleDrag);
            document.removeEventListener('dragleave', handleDrag);
            document.removeEventListener('drop', handleDrop);
        };
    }, [])
    const handleUpload = () => {
        if (file) {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = () => {
                if (reader.result) {
                    const fileBytes = new Uint8Array(reader.result as ArrayBuffer);
                    const encodedFile = encodeFileInChunks(fileBytes, 1023);
                    const data = {
                        fileName: file.name,
                        avatarEncodedBytes: encodedFile
                    };
                    dispatch(changeAvatar(data))
                        .unwrap()
                        .then(() => toast.success("Change Avatar Successfully"))
                        .catch(() => toast.error("Change Avatar Failed!"));
                }
            }
        }
    }
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className='modal-header'>
                    <p className='modal-header-title'>Change Avatar</p>
                    <IoMdClose className='modal-icon' onClick={() => closeDragDropModal()} />
                </div>
                <div
                    className="drag-drop"
                    onClick={() => inputRef.current?.click()}
                >
                    {file ? (
                        <div className="img-preview">
                            <img src={URL.createObjectURL(file)} alt="" />
                        </div>
                    ) : (
                        <div className="drag-drop-area"
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDrop={handleDrop}
                        >
                            {dragActive ? (
                                <p>Drop your image here</p>
                            ) : (
                                <>
                                    <p>Drag & drop your image</p>
                                    <p>or</p>
                                    <p>Click here to browse</p>
                                </>
                            )}
                            <input ref={inputRef} type="file" accept="image/*" onChange={handleFileChange} hidden />
                        </div>
                    )}
                </div>
                <div className="modal-btn">
                    <div onClick={() => {
                        handleUpload();
                        setFile(null);
                    }}>
                        Upload
                    </div>
                    <div onClick={() => {
                        if (file) {
                            setFile(null);
                        } else closeDragDropModal();
                    }}>
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DragDropModal;