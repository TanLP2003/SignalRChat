import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../../../redux/features/userSlice';
import { AppDispatch, RootState } from '../../../../redux';
import { useFetchData } from '../../../hooks/useFetchData';
import { getAllUsers } from '../../../../redux/actions/user-action';
import { ReactNode, useEffect } from 'react';
import UserInfo from '../../UserInfo';
import Skeleton from '../../Skeleton';

interface UserListProps {
    searchTerm: string
    handleClick: (user: User) => void;
    isFetched: boolean
    selectedUser: User | null
}

const UserList: React.FC<UserListProps> = ({ searchTerm, handleClick, isFetched, selectedUser }) => {
    const allUserList = useSelector((state: RootState) => state.users.allUsers);
    const dispatch: AppDispatch = useDispatch();
    const userId = localStorage.getItem('userId');
    useEffect(() => {
        if (selectedUser) {
            const selectedLi = document.getElementById(`${selectedUser.id}`);
            selectedLi?.classList.add('active');
        }
    }, [allUserList])
    const renderUsersList = (): ReactNode => {
        if (allUserList.length === 0) {
            return <div className='no-users'><p >No other users</p></div>
        }
        return (<ul id='list'>
            {allUserList
                .filter(user => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(user => {
                    return <li id={user.id} key={user.id} onClick={() => handleClick(user)}>
                        <UserInfo selectedUser={user} />
                    </li>
                })
            }
        </ul>
        )
    }
    return (
        <div className='list'>
            {isFetched ? renderUsersList()
                : <Skeleton times={5} />
            }
        </div>
    )
}

export default UserList;