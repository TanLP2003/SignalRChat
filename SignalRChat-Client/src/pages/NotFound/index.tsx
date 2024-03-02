import './NotFound.scss';
import { HiOutlineEmojiSad } from "react-icons/hi";
import logo from '../../assets/img/chat_724698.png';
const NotFound: React.FC = () => {
    return (
        <div className='not-found'>
            <img src={logo} alt="" />
            <h1>SignalRChat</h1>
            <div className='not-found-content'  >
                <HiOutlineEmojiSad size={40} />
                <p>404 Page Not Found!!!</p>
            </div>
            <a href="/">Back to Home</a>
        </div>
    )
}

export default NotFound;