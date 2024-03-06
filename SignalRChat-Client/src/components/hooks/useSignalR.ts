import { DefaultHttpClient, HttpError, HttpRequest, HttpResponse, HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr";
import { useEffect, useState } from "react"
import { SERVER_URL } from "../../redux/config";
import { FileMessage, Message, addMessage } from "../../redux/features/messageSlice";
import { AppDispatch } from "../../redux";
import { useDispatch } from "react-redux";
import { User, addOnLineUser, removeOffLineUser } from "../../redux/features/userSlice";
import { getAllUsers, getContactedUsers } from "../../redux/actions/user-action";
import axios from "axios";

class CustomHttpClient extends DefaultHttpClient {
    constructor() {
        super(console)
    }
    public async send(
        request: HttpRequest
    ): Promise<HttpResponse> {
        const accessToken = localStorage.getItem('accessToken');
        request.headers = {
            ...request.headers,
            Authorization: `Bearer ${accessToken}`
        };

        try {
            const response = await super.send(request);
            return response;
        } catch (er) {
            if (er instanceof HttpError) {
                const error = er as HttpError;
                if (error.statusCode == 401) {
                    const oldAccessToken = localStorage.getItem("accessToken");
                    const oldRefreshToken = localStorage.getItem("refreshToken");
                    const response = await axios.post(`${SERVER_URL}/api/auth/refreshToken`, {
                        accessToken: oldAccessToken,
                        refreshToken: oldRefreshToken
                    });
                    const { newAccessToken, newRefreshToken } = response.data;
                    localStorage.setItem("accessToken", newAccessToken);
                    localStorage.setItem("refreshToken", newRefreshToken);
                    request.headers = {
                        ...request.headers,
                        Authorization: `Bearer ${newAccessToken}`
                    };
                }
            } else {
                throw er;
            }
        }
        return super.send(request);
    }
};

export const useSignalR = () => {
    const accessToken = localStorage.getItem("accessToken");
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [isConnected, setConnected] = useState<boolean>(false);
    const [sendMessage, setSendMessage] = useState<Function | null>(null);
    const [sendFileMessage, setSendFileMessage] = useState<Function | null>(null);
    const userId = localStorage.getItem('userId');
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`${SERVER_URL}/chat`, {
                withCredentials: true,
                httpClient: new CustomHttpClient()
            })
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
        newConnection.onclose((err) => {
            console.log(err)
        })
    }, [accessToken]);
    const onUserStatusReceived = async (userId: string, status: string) => {
        if (status === "online") {
            dispatch(addOnLineUser(userId));
            await connection!.invoke("SendMyStatusToUserJustLogin", userId);
        }
        else dispatch(removeOffLineUser(userId));
    }
    const onMessageReceived = (message: Message) => {
        dispatch(addMessage(message));
        dispatch(getContactedUsers(userId!));
    }
    const onOnlineUsersReceivedWhenJustLogined = async (userId: string) => {
        dispatch(addOnLineUser(userId));
    }
    const onNewUserSignUp = () => {
        dispatch(getAllUsers(userId!));
    }
    useEffect(() => {
        const startConnection = async () => {
            try {
                if (connection) {
                    const storedConnectionId = localStorage.getItem('connectionId');
                    if (storedConnectionId) {
                        await connection.stop();
                    }

                    await connection.start();

                    setConnected(true);

                    connection.on("ReceiveUserStatus", onUserStatusReceived);
                    connection.on("ReceiveMessage", onMessageReceived);
                    connection.on("ReceiveOnlineUsersWhenJustLogined", onOnlineUsersReceivedWhenJustLogined);
                    connection.on("ReceiveNewUserEvent", onNewUserSignUp);
                    localStorage.setItem('connectionId', connection.connectionId!);
                }
            } catch (error) {
                console.log("Connection start failed: ", error);
            }
        };

        startConnection();

        return () => {
            if (connection?.state == HubConnectionState.Connected) {
                connection?.off("ReceiveUserStatus", onUserStatusReceived);
                connection?.off("ReceiveMessage", onMessageReceived);
                connection.off("ReceiveOnlineUsersWhenJustLogined", onOnlineUsersReceivedWhenJustLogined);
                connection?.stop()
                    .then(() => {
                        console.log("Connection stop...");
                        setConnected(false);
                    })
                    .catch(err => console.log("Stop connection failed: ", err))
                localStorage.removeItem('connectionId');
            }
        }
    }, [connection])

    useEffect(() => {
        if (isConnected && connection) {
            const onSendMessage = async (message: Message) => {
                dispatch(addMessage(message));
                await connection.invoke("SendTextMessage", JSON.stringify(message));
                dispatch(getContactedUsers(userId!));
            }
            const onSendFileMessage = async (fileMessage: FileMessage) => {
                const message = await connection.invoke("SendFileMessage", JSON.stringify(fileMessage));
                dispatch(addMessage(message));
                dispatch(getContactedUsers(userId!));
            }

            setSendMessage(_ => onSendMessage);
            setSendFileMessage(_ => onSendFileMessage);
        } else {
            setSendMessage(null);
        }
    }, [isConnected, connection])
    return [sendMessage, sendFileMessage];
}