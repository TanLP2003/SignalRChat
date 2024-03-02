import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux';
import { ReactNode, useEffect } from 'react';
import UserInfo from '../../UserInfo';
import { User } from '../../../../redux/features/userSlice';
import { useFetchData } from '../../../hooks/useFetchData';
import { getContactedUsers } from '../../../../redux/actions/user-action';
import Skeleton from '../../Skeleton';

interface InboxListProps {
    searchTerm: string;
    handleClick: (user: User) => void;
    isFetched: boolean
    selectedUser: User | null
}

const InboxList: React.FC<InboxListProps> = ({ searchTerm, handleClick, isFetched, selectedUser }) => {
    const contactedList = useSelector((state: RootState) => state.users.contactedList);
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        if (selectedUser) {
            const selectedLi = document.getElementById(`${selectedUser.id}`);
            selectedLi?.classList.add('active');
        }
    }, [contactedList])
    const renderInboxList = (): ReactNode => {
        if (contactedList.length === 0) {
            return <div className='no-users'><p >No contacted users</p></div>
        }
        return (<ul id='list'>
            {contactedList
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
            {isFetched ? renderInboxList()
                : <Skeleton times={5} />
            }
        </div>
    )
}

export default InboxList;