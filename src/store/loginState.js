import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedUser: {
    username: "",
    userId: "",
    id: null,
  },
  loggedIn: false,
  loginForm: {
    onLoginForm: false,
  },
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setLogin(state, action) {
      state.loggedUser = action.payload;
      state.loggedIn = true;
      state.loginForm.onLoginForm = false;
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
      state.loginForm.onLoginForm = false;
    },
    onToggleLoginForm(state) {
      state.loginForm.onLoginForm = !state.loginForm.onLoginForm;
    },
  },
});
export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
