import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetails: {},
    isLoggedIn: false,
    accessToken: "",
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        login: (state, {payload: {userDetails, authorization}}) => {
            state.isLoggedIn = true;
            state.userDetails = {...userDetails};
            state.accessToken = authorization;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.userDetails = {...initialState.userDetails};
            state.accessToken = "";
        }
    }
});

export const actions = profileSlice.actions;

const store = configureStore({
    reducer: profileSlice.reducer
});

export default store;