import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chatId: null,
        user: null,
        chatUid: null
    },
    reducers: {
        setChat: (state, action) => {
            const { chatId, user, chatUid } = action.payload;
            state.chatId = chatId;
            state.user = user;
            state.chatUid = chatUid;
        },

    },
});

export const { setChat } = chatSlice.actions;

export default chatSlice.reducer;

export const selectChatId = (state) => state.chat.chatId;
export const selectUser = (state) => state.chat.user;
export const selectChatUid = (state) => state.chat.chatUid;