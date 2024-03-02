import './MessageDisplay.scss';

interface MessageDisplayProps {
    type: string,
    content: string,
    timeStamp: string
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ type, content, timeStamp }) => {
    if (type === "Text") {
        return <p className="message-text">{content}</p>
    } else if (type == "Image") {
        return <div className="message-img"><img src={content} /></div>
    } else if (type == "Video") {
        return <div className="message-video"><video controls src={content} /></div>
    } else {
        const arr: string[] = content.split('/');
        return <div className="message-file" ><a target='_blank' href={content}>{arr[arr.length - 1]}</a></div>
    }
}

export default MessageDisplay;