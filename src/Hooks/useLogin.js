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
          console.log(result.name);
          setLoggedUser(result.name);
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
