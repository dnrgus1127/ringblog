import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { loginActions } from "../../redux/loginState";
import { useState } from "react";

// TODO 로그인, 로그아웃 관련된 커스텀 훅
export default function useAuth() {
  const [isFailAuth, setIsFailAuth] = useState(false);
  const [failType, setFailType] = useState(999);
  const dispatch = useDispatch();

  const { mutateAsync: login, isLoading: isLoadingLogin } = useMutation(
    async ({ userId, password }) => {
      const response = await fetch(`/login`, {
        method: "POST",
        body: JSON.stringify({ userId: userId, password: password }),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      // 로그인 실패 시 {authSuccess(bool), failMessage(String)}
      if (!result.isLogined) {
        setIsFailAuth(true);
        setFailType(result.failType);
        return false;
      } else {
        // 로그인 성공 시 {userId(String), username(String)} Object result
        dispatch(loginActions.setLogin(result));
        return true;
      }
    }
  );

  const { mutateAsync: logoutQuery } = useMutation(
    ["logOutQuery"],
    async () => {
      await fetch("/logout");
      return;
    }
  );
  const logout = async () => {
    await logoutQuery();
    dispatch(loginActions.setLogout());
  };
  return { login, isLoadingLogin, isFailAuth, failType, logout };
}
