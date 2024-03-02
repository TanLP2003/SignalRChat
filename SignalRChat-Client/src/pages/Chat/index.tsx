import { useState } from "react";
import "./Chat.scss";
import ChatView from "../../components/common/ChatView";
import ChatList from "../../components/common/ChatList";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { useSignalR } from "../../components/hooks/useSignalR";
import { User } from "../../redux/features/userSlice";
import Loading from "../../components/common/Loading";


const Chat: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [sendMessage, sendFileMessage] = useSignalR();
    const isLoading = useSelector((state: RootState) => state.loading.loading);
    return (
        <>
            {isLoading && <Loading />}
            <div className="chat">
                <ChatList selectedUser={selectedUser} selectUser={setSelectedUser} />
                <ChatView sendFileMessage={sendFileMessage!} sendMessage={sendMessage!} selectedUser={selectedUser} />
            </div>
        </>
    )
}

export default Chat;