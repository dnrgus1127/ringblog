import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { loginActions } from "../../redux/loginState";

// TODO 로그인, 로그아웃 관련된 커스텀 훅
// ! 현재 로그아웃만 구현
export default function useAuth() {
  const dispatch = useDispatch();

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
  return { logout };
}
