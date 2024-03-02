import { BsChatFill } from "react-icons/bs";
import { LuUser2 } from "react-icons/lu";
import './CategoryList.scss';
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux";

interface CategoryListProps {
    selectedCategory: string,
    setSelectedCategory: Function
    isFetched: boolean
}

const CategoryList: React.FC<CategoryListProps> = ({ selectedCategory, setSelectedCategory, isFetched }) => {
    const { contactedUsers, allUsers } = useSelector((state: RootState) => {
        // console.log(state.users.contactedList);
        return {
            contactedUsers: state.users.contactedList,
            allUsers: state.users.allUsers
        }
    });
    const handleClick = (category: string) => {
        setSelectedCategory(category);
    }
    // console.log(isFetched);
    return (
        <div className="category">
            <div className={'category-item ' + (selectedCategory === 'inbox' && 'selected')} onClick={() => handleClick('inbox')}>
                <BsChatFill />
                <p style={{ margin: '0px 5px' }}>Inbox</p>
                <div><p>{isFetched ? contactedUsers.length : 0}</p></div>
            </div>
            <div className={'category-item ' + (selectedCategory === 'users' && 'selected')} onClick={() => handleClick('users')}>
                <LuUser2 />
                <p style={{ margin: '0px 5px' }}>Users</p>
                <div><p>{isFetched ? allUsers.length : 0}</p></div>
            </div>
        </div>
    )
}

export default CategoryList;