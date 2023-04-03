import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginActions } from "../redux/loginState";

export default function useIsLogin(dependency) {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(loginActions.setLogout());
  };
  useEffect(() => {
    fetch("/login")
      .then((res) => res.json())
      .then((data) => {
        if (data.isLogined === false) {
          logout(false);
        }
      });
  }, [dependency]);

  return;
}
