import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux";
import { User } from "../../../redux/features/userSlice"
import { useFetchData } from "../../hooks/useFetchData";
import './UserInfo.scss';
import { getLatestMessageBetweenUser } from "../../../redux/actions/message-action";
interface UserInfoProps {
    selectedUser: User;
}

const UserInfo: React.FC<UserInfoProps> = ({ selectedUser }) => {
    const onLineUsers = useSelector((state: RootState) => state.users.onlineUsers);
    // const isFetched = useFetchData(() => {
    //     const arg = {
    //         firstUser: userId!,
    //         secondUser: selectedUser.id
    //     }
    //     return Promise.all([dispatch(getLatestMessageBetweenUser(arg))]);
    // });
    // const latestMessage = useSelector((state: RootState) => {
    //     console.log(state.messages.latestMessageWithUser);
    //     return state.messages.latestMessageWithUser.get(selectedUser.id)
    // })
    return (
        <div className="user-info">
            <div className='avatar'>
                <img src={selectedUser.avatar} />
            </div>
            <div className="detail">
                <p>{selectedUser.userName}</p>
                {onLineUsers.includes(selectedUser.id)
                    ? (
                        <div className="status">
                            <div className="online"></div>
                            <div>online</div>
                        </div>
                    )
                    : (
                        <div className="status">
                            <div className="offline"></div>
                            <div>offline</div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default UserInfo;