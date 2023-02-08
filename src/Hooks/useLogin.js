import { useContext } from "react";
import { useEffect } from "react";
import { Context } from "../functions/Login/LoginProvider";

function useLogin() {
  const { loggedIn, setLoggedUser, setLoggedIn } = useContext(Context);
  useEffect(() => {
    fetch("/login")
      .then((data) => data.json())
      .then((result) => {
        if (result.isLogined === true) {
          setLoggedUser({ username: result.username, userId: result.userId });
          if (loggedIn === false) {
            setLoggedIn(true);
          }
        } else {
          setLoggedIn(false);
        }
      });
  }, [loggedIn, setLoggedIn, setLoggedUser]);
}

export { useLogin };
