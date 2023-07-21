import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { settingActions } from "../../store/settingState";

export default function useGetSetting() {
  const { loggedUser, loggedIn } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useQuery(
    ["userSetting", loggedUser.userId],
    async () => {
      const response = await fetch(
        `/setting/userAll?userId=${loggedUser.userId}`
      );
      return response.json();
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
      cacheTime: 60 * 1000,
      enabled: loggedIn,
      onSuccess: (data) => {
        dispatch(settingActions.setSetting(data));
      },
      onError: () => {
        console.log("useGetSetting : useQuery Error");
      },
    }
  );
}
