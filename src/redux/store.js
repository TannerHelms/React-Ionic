import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./auth"
import detailsReducer from "./details"
export default configureStore({
    reducer: {
        auth: authReducer,
        details: detailsReducer,
    },
})