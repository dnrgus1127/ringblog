import { useDispatch } from "react-redux";
import { commonActions } from "../../../redux/commonState";

export default function useAlert() {
  const dispatch = useDispatch();
  const onToggleAlert = (msg, onFail = false) => {
    dispatch(
      commonActions.onToggleAlert({
        message: msg,
        onFail: onFail,
      })
    );
  };

  return { onToggleAlert };
}
