import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { loginActions } from "../../redux/loginState";

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
