import { useMutation } from "react-query";
import useAlert from "../../components/common/hooks/useAlert";

export default function useSubscription({ writer }) {
  const { onToggleAlert } = useAlert();
  const { mutate: unSubscribe } = useMutation(["unSubscribe"], async () => {
    const response = await fetch(`/subscription?writer=${writer}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (result.result) {
      onToggleAlert("구독이 취소되었습니다.");
      return true;
    } else {
      onToggleAlert("구독 취소에 실패했습니다.", true);
      return false;
    }
  });
  return { unSubscribe };
}
