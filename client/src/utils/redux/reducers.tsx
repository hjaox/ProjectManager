import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetails: {
        _id: "",
        name: "",
        username: "",
        email: "",
        accessToken: "",
    },
    isLoggedIn: false,
    guestMode: false,
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.isLoggedIn = true;
            state.userDetails = { ...payload };
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userDetails = { ...initialState.userDetails };
        },
        loginAsGuest: (state) => {
            state.guestMode = true;
        },
        logoutAsGuest: (state) => {
            state.guestMode = false;
        }
    }
});

export const actions = profileSlice.actions;

export default profileSlice.reducer;