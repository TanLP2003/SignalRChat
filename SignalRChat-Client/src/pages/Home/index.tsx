import './Home.scss';
import landingImg from '../../assets/img/8440.jpg';
import featureImg from '../../assets/img/2892359.jpg';
import { FaRegImages, FaRegMessage, FaUserCheck } from "react-icons/fa6";
import { MdOndemandVideo } from "react-icons/md";

const Home: React.FC = () => {
    return (
        <>
            <div className='home'>
                <div className='home-body'>
                    <div id="landing" className='landing'>
                        <div className='landing-left'>
                            <h1>Welcome to <br /> SignalRChat</h1>
                            <p>Send free messages privately <br />simply, and reliably anywhere in the world</p>
                            <a href="#feature">Discover the features</a>
                        </div>
                        <div className='landing-right'>
                            <img src={landingImg} alt="" />
                        </div>
                    </div>
                    <div id="feature" className='feature'>
                        <div className='feature-left'>
                            <img src={featureImg} alt="" />
                        </div>
                        <div className='feature-right'>
                            <h1>Features</h1>
                            <div>
                                <FaRegMessage className='icon' />
                                <p><strong>Real-Time messaging:</strong> Messages are sent and received instantly.</p>
                            </div>
                            <div>
                                <FaRegImages className='icon' />
                                <p><strong>Send images and text files up to 10MB:</strong> You can share photos, documents, and other files with your friends and family.</p>
                            </div>
                            <div>
                                <MdOndemandVideo className='icon' />
                                <p><strong>Send videos with a maximum capacity of 20MB:</strong> You can share videos of your special moments with your loved ones.</p>
                            </div>
                            <div>
                                <FaUserCheck className='icon' />
                                <p><strong>Real-time status updates:</strong> You can let your friends and family know what you are up to.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Home;