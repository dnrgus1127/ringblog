import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colorActions } from "../../redux/colorState";

export default function useDarkMode() {
  const { setting } = useSelector((state) => state.setting);
  const dispatch = useDispatch();

  useEffect(() => {
    if (setting.darkMode === 0) {
      // 다크모드 아님
      dispatch(colorActions.setLightMod());
    } else if (setting.darkMode === 1) {
      // 다크모드
      dispatch(colorActions.setDarkMod());
    }
  }, [setting.darkMode, dispatch]);
}
