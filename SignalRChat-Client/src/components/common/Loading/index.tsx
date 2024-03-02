import './Loading.scss';

const Loading: React.FC = () => {
    return (
        <div className='modal-overlay loading-container'>
            <div className='loading-dot'></div>
            <div className='loading-dot'></div>
            <div className='loading-dot'></div>
        </div>
    )
}

export default Loading;