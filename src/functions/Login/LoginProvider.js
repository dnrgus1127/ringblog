import { createContext, useState } from "react";

const Context = createContext({
  loggedUser: {
    username: "",
    userId: "",
  },
  loggedIn: false,
  setLoggedUser: () => {},
  setLoggedIn: () => {},
});

const LoginProvider = ({ children }) => {
  const setLoggedUser = (data) => {
    setState((prevState) => ({
      ...prevState,
      loggedUser: data,
    }));
  };

  const setLoggedIn = (data) => {
    setState((prevState) => ({
      ...prevState,
      loggedIn: data,
    }));
  };

  const initialState = {
    loggedUser: {
      username: "",
      userId: "",
    },
    loggedIn: false,
    setLoggedUser,
    setLoggedIn,
  };

  const [state, setState] = useState(initialState);

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export { Context, LoginProvider };
