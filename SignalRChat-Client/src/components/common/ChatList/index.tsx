import { FaSearch } from 'react-icons/fa';
import './ChatList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux';
import { useFetchData } from '../../hooks/useFetchData';
import { getAllUsers, getContactedUsers } from '../../../redux/actions/user-action';
import { ChangeEvent, ReactNode, useState } from 'react';
import { User } from '../../../redux/features/userSlice';
import Skeleton from '../Skeleton';
import UserInfo from '../UserInfo';
import CategoryList from './CategoryList';
import InboxList from './InboxList';
import UserList from './UserList';

interface ChatListProps {
    selectUser: (user: User) => void;
    selectedUser: User | null
}

const ChatList: React.FC<ChatListProps> = ({ selectUser, selectedUser }) => {
    const currentUserId = localStorage.getItem("userId");
    const dispatch: AppDispatch = useDispatch();
    // const { contactedUsers, skeleton } = useSelector((state: RootState) => ({
    //     contactedUsers: state.users.contactedList,
    //     skeleton: state.loading.skeleton
    // }));
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<"inbox" | "users">('inbox');
    const { isFetched } = useFetchData(() => {
        return Promise.all([
            dispatch(getContactedUsers(currentUserId!)),
            dispatch(getAllUsers(currentUserId!))
        ])
    })
    // console.log("fetched: ", isFetched);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }
    const handleClick = (user: User) => {
        selectUser(user);
        const listItems = document.querySelectorAll('#list li');
        listItems.forEach(li => li.classList.remove('active'));
        const selectedLi = document.getElementById(`${user.id}`);
        selectedLi?.classList.add('active');
    }
    return (
        <div className="users">
            <div className='title'>Chats</div>
            <div className="search-bar">
                <div style={{ padding: '10px' }}>
                    <span><FaSearch /></span>
                </div>
                <div style={{ width: '100%', padding: '10px', backgroundColor: '#fff', borderRadius: '5px' }}>
                    <input type="text"
                        name="search"
                        id="search"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <CategoryList isFetched={isFetched} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            {selectedCategory === 'inbox'
                ? <InboxList selectedUser={selectedUser} searchTerm={searchTerm} handleClick={handleClick} isFetched={isFetched} />
                : <UserList selectedUser={selectedUser} searchTerm={searchTerm} handleClick={handleClick} isFetched={isFetched} />
            }
        </div >
    )
}

export default ChatList;