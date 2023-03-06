import { useEffect } from "react";
import { useContext } from "react";
import { Context } from "../functions/Login/LoginProvider";

export default function useIsLogin(dependency) {
  const { setLoggedIn } = useContext(Context);
  useEffect(() => {
    fetch("/login")
      .then((res) => res.json())
      .then((data) => {
        if (data.isLogined === false) {
          setLoggedIn(false);
        }
      });
  }, [dependency, setLoggedIn]);

  return;
}
