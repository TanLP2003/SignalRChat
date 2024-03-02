import { createSlice } from "@reduxjs/toolkit";
import { getLatestMessageBetweenUser, getMessageOfUser } from "../actions/message-action";

export interface Message {
    id: string,
    senderId: string,
    receiverId: string,
    content: string,
    type: string,
    timeStamp: string
}
/*
messages {
    messagesWithUser: [],
    lastestMessageWithUser: []
}
 */
export interface FileMessage {
    Id: string,
    SenderId: string,
    ReceiverId: string,
    FileName: string,
    FileType: string,
    File: string, // base64 encoding string
    TimeStamp: string
}
const initialMap = new Map<string, string>();
initialMap.set('_', '_');
// console.log(initialMap);
const initialValue: {
    messages: Message[],
    latestMessageWithUser: string
} = {
    messages: [],
    latestMessageWithUser: JSON.stringify(initialMap)
}

export const messageSlice = createSlice({
    name: "messages",
    initialState: initialValue,
    reducers: {
        addMessage(state, action) {
            state.messages = [...state.messages, action.payload];
        }
    },
    extraReducers(builder) {
        builder.addCase(getMessageOfUser.fulfilled, (state, action) => {
            state.messages = action.payload as Message[];
        })

    },
})

export const { addMessage } = messageSlice.actions;
export const messageReducers = messageSlice.reducer;