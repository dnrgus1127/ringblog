import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/loginState";

export default function useIsLogin(dependency) {
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    dispatch(loginActions.setLogout());
  }, [dispatch]);
  useEffect(() => {
    fetch("/login")
      .then((res) => res.json())
      .then((data) => {
        if (data.isLogined === false) {
          logout(false);
        }
      });
  }, [dependency, logout]);

  return;
}
