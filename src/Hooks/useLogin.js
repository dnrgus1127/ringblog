import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../redux/loginState";

function useLogin() {
  const { loggedIn } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const login = (data) => {
    dispatch(loginActions.setLogin(data));
  };
  const logout = () => {
    dispatch(loginActions.setLogout());
  };

  useEffect(() => {
    fetch("/login")
      .then((data) => data.json())
      .then((result) => {
        if (result.isLogined === true) {
          login({ username: result.username, userId: result.userId });
        } else {
          logout(false);
        }
      });
  }, [loggedIn]);
}

export { useLogin };
