import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./auth"
import detailsReducer from "./details"
import chatReducer from "./chat"
export default configureStore({
    reducer: {
        auth: authReducer,
        details: detailsReducer,
        chat: chatReducer,
    },
})