import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedUser: {
    username: "",
    userId: "",
  },
  loggedIn: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setLogin(state, action) {
      state.loggedUser = action.payload;
      state.loggedIn = true;
    },
    setLoggedUser(state, action) {
      state.loggedUser.username = action.payload;
    },
    setLogout(state) {
      state.loggedUser = {
        username: "",
        userId: "",
      };
      state.loggedIn = false;
    },
  },
});
export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
