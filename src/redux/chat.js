import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chatId: null,
        user: null,
    },
    reducers: {
        setChat: (state, action) => {
            const { chatId, user } = action.payload;
            state.chatId = chatId;
            state.user = user;
        },

    },
});

export const { setChat } = chatSlice.actions;

export default chatSlice.reducer;

export const selectChatId = (state) => state.chat.chatId;
export const selectUser = (state) => state.chat.user;