import { createContext, useState } from "react";

const Context = createContext({
  loggedUser: {
    username: "",
  },
  loggedIn: false,
  setLoggedUser: () => {},
  setLoggedIn: () => {},
});

const LoginProvider = ({ children }) => {
  const setLoggedUser = (data) => {
    console.log(data);
    setState((prevState) => ({
      ...prevState,
      loggedUser: { username: data },
    }));
  };

  const setLoggedIn = () => {
    setState((prevState) => ({
      ...prevState,
      loggedIn: !prevState.loggedIn,
    }));
  };

  const initialState = {
    loggedUser: { username: "로그인 X" },
    loggedIn: false,
    setLoggedUser,
    setLoggedIn,
  };

  const [state, setState] = useState(initialState);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export { Context, LoginProvider };
