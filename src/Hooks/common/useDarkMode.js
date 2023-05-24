import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colorActions } from "../../redux/colorState";

export default function useDarkMode() {
  const { setting } = useSelector((state) => state.setting);
  const { loggedIn } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    // 로그인 안되어 있으면 설정값 참조 X
    if (!loggedIn) return;

    if (setting.darkMode === 0) {
      // 다크모드 아님
      dispatch(colorActions.setLightMod());
    } else if (setting.darkMode === 1) {
      // 다크모드
      dispatch(colorActions.setDarkMod());
    }
  }, [loggedIn, setting.darkMode, dispatch]);
}
