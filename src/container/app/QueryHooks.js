import useDarkMode from "../../Hooks/common/useDarkMode";
import useGetSetting from "../../Hooks/setting/useGetSetting";

export default function QueryHooks() {
  useGetSetting();
  useDarkMode();

  return;
}
