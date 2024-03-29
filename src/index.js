import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import writeReducer from "./store/writeReducer";
import postState from "./store/postState";
import settingState from "./store/settingState";
import loginState from "./store/loginState";
import commonState from "./store/commonState";
import colorState from "./store/colorState";

let store = configureStore({
  reducer: {
    write: writeReducer,
    post: postState,
    setting: settingState,
    login: loginState,
    common: commonState,
    color: colorState,
  },
  devTools: process.env.NODE_ENV !== "production",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //   <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
