import { VscSend } from 'react-icons/vsc';
import { IoIosAttach } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { AiFillFileAdd } from "react-icons/ai";
import './ChatView.scss';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { User } from '../../../redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux';
import { useFetchData } from '../../hooks/useFetchData';
import { getMessageOfUser } from '../../../redux/actions/message-action';
import { FileMessage, Message } from '../../../redux/features/messageSlice';
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import UserInfo from '../UserInfo';
import { encodeFileInChunks } from '../../../redux/config';
import MessageDisplay from '../MessageDisplay';
import { toast } from 'react-toastify';
import Loading from '../Loading';
interface ChatBoxProps {
    selectedUser: User | null
    sendMessage: Function | null
    sendFileMessage: Function | null
}

const ChatView: React.FC<ChatBoxProps> = ({ sendMessage, selectedUser, sendFileMessage }) => {
    const currentUserId = localStorage.getItem("userId");
    const dispatch: AppDispatch = useDispatch();
    const [content, setContent] = useState<string>('');
    const messages = useSelector((state: RootState) => state.messages.messages);
    const [fileList, setFileList] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isFetchedMessage = useFetchData(() => {
        return Promise.all([
            dispatch(getMessageOfUser(currentUserId!))
        ])
    })
    const handledChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log("submit");
        if (content !== '') {
            const textMessage: Message = {
                id: uuidv4(),
                senderId: currentUserId!,
                receiverId: selectedUser!.id,
                content: content,
                type: "Text",
                timeStamp: format(new Date(), "yyyy-MM-dd HH:mm:ss")
            }
            sendMessage!(textMessage);
            setContent(_ => '');
        }
        if (fileList.length) {
            fileList.map(selectedFile => {
                const reader = new FileReader();
                const type = selectedFile.type.split('/')[0];
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = () => {
                    if (reader.result) {
                        const fileBytes = new Uint8Array(reader.result as ArrayBuffer);
                        console.log(fileBytes.length);
                        console.log(fileBytes.byteLength);
                        const fileMessage: FileMessage = {
                            Id: uuidv4(),
                            SenderId: currentUserId!,
                            ReceiverId: selectedUser!.id,
                            FileName: selectedFile.name,
                            FileType: `${type[0].toUpperCase()}${type.slice(1)}`,
                            File: encodeFileInChunks(fileBytes, 1023),
                            TimeStamp: format(new Date(), "yyyy-MM-dd HH:mm:ss")
                        }
                        sendFileMessage!(fileMessage);
                    }
                }
            })

            setFileList(_ => []);
        }
    }
    const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };
    const scrollableContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (scrollableContainerRef.current) {
            const scrollableContainer = scrollableContainerRef.current;
            scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
        }
    }, [messages, selectedUser])
    const renderMessages = () => {
        return <ul>
            {messages
                .filter(m => m.senderId === selectedUser?.id || m.receiverId === selectedUser?.id)
                .map(message => {
                    let classes: string;
                    if (message.senderId === selectedUser?.id) classes = "receiver";
                    else classes = "sender";
                    return (
                        <li className={"message-" + classes}>
                            <div className='popup-wrapper'>
                                <div className={'popup-content ' + `popup-${classes}`}>
                                    <div>{message.timeStamp.slice(0, 10)} at {message.timeStamp.slice(11)}</div>
                                </div>
                                <MessageDisplay type={message.type} content={message.content} timeStamp={message.timeStamp} />
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    }

    const handleAttachIconClick = () => {
        fileInputRef.current?.click();
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files && e.target.files[0];
        const maxFileSize = 10 * 1024 * 1024;
        const maxVideoSize = 21 * 1024 * 1024;
        if (newFile) {
            console.log("choose file!");
            const type = newFile.type.split('/')[0];
            if (type !== "video") {
                if (newFile.size <= maxFileSize) {
                    const newFileList = [...fileList, newFile];
                    setFileList(_ => newFileList);
                } else toast.error('Max file upload is 10MB!');
            } else {
                if (newFile.size <= maxVideoSize) {
                    const newFileList = [...fileList, newFile];
                    setFileList(_ => newFileList);
                } else toast.error("Max video upload is 20MB");
            }
        }
    }
    const clearSelectedFile = (i: number) => {
        const newFileList = fileList.filter((_, id) => id !== i);
        setFileList(_ => newFileList);
    }
    return (
        <div className='chat-view'>
            {!selectedUser && (<div className="non-selected"><p>Select User to display chat</p></div>)}
            {selectedUser && (
                <div className='chat-box'>
                    <div className="inbox" >
                        <UserInfo selectedUser={selectedUser} />
                        <div className="seperator-row"></div>
                        <div className="inbox-display" ref={scrollableContainerRef}>
                            {isFetchedMessage && (renderMessages())}
                        </div>
                        <div className='bar'>
                            {fileList.length === 0 && (
                                <div className='bar-attach' onClick={handleAttachIconClick}>
                                    <IoIosAttach size={20} />
                                </div>
                            )}
                            <form className="bar-input" onSubmit={handleSubmit}>
                                {fileList.length !== 0 && (
                                    <div className='bar-input-file'>
                                        <div className='bar-input-file-addIcon' onClick={handleAttachIconClick}>
                                            <AiFillFileAdd size={20} />
                                        </div>
                                        {fileList.map((selectedFile, id) => {
                                            return <div className='bar-input-file-item' key={id}>
                                                <p style={{ marginRight: '5px' }}>{selectedFile.name}</p>
                                                <button onClick={() => clearSelectedFile(id)}><IoIosClose /></button>
                                            </div>
                                        })}
                                    </div>
                                )}
                                <div className='bar-input-message'>
                                    <input type="file" hidden ref={fileInputRef} multiple onChange={handleFileChange} />
                                    <input placeholder="Type your message..." onChange={handledChange} value={content} onKeyDown={handleEnter} />
                                    <div className='submit'><button type='submit'><VscSend size={20} /></button></div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* <div className='seperator-column'></div> */}
                    <div className='selected-user'>
                        <div className='selected-user-title'><p>User Information</p></div>
                        <div className='selected-user-info'>
                            <img src={selectedUser.avatar} alt={`Avatar of ${selectedUser.firstName} ${selectedUser.lastName}`} />
                            <div className='selected-user-info-details'>
                                <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
                                <p><strong>Username:</strong> {selectedUser.userName}</p>
                                <p><strong>Email:</strong> {selectedUser.email}</p>
                                <p><strong>Phone Number:</strong> {selectedUser.phoneNumber}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ChatView;