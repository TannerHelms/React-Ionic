import { createSlice } from "@reduxjs/toolkit";

export const detailsSlice = createSlice({
    name: 'details',
    initialState: {
        user: null,
    },
    reducers: {
        setDetailUser: (state, action) => {
            const { user } = action.payload
            state.user = user
        },
    },
})

export const { setDetailUser } = detailsSlice.actions;

export default detailsSlice.reducer

export const getUser = (state) => state.details.user