import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../redux/loginState";

function useLogin() {
  const { loggedIn } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const login = useCallback(
    (data) => {
      dispatch(loginActions.setLogin(data));
    },
    [dispatch]
  );
  const logout = useCallback(() => {
    dispatch(loginActions.setLogout());
  }, [dispatch]);

  useEffect(() => {
    fetch("/login")
      .then((data) => data.json())
      .then((result) => {
        if (result.isLogined === true) {
          login(result);
        } else {
          logout(false);
        }
      });
  }, [loggedIn, login, logout]);
}

export { useLogin };
