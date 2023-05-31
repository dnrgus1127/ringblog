import { useMutation } from "react-query";
import useAlert from "../../components/common/hooks/useAlert";
import { useEffect, useState } from "react";

export default function useSubscription({ writer }) {
  const { onToggleAlert } = useAlert();
  const [sub, setSub] = useState(false);

  useEffect(() => {
    fetch(`/subscription?writer=${writer}`)
      .then((res) => res.json())
      .then((data) => setSub(data.result));
  }, [writer]);

  const { mutate: subscribe } = useMutation(["subscribe"], async () => {
    const res = await fetch(`/subscription?writer=${writer}`, {
      method: "POST",
    });
    const result = await res.json();

    if (result.result) {
      onToggleAlert("이 블로거를 구독합니다.");
      setSub(true);
      return true;
    } else {
      onToggleAlert("구독 에 실패했습니다.", true);

      return false;
    }
  });

  const { mutate: unSubscribe } = useMutation(["unSubscribe"], async () => {
    const response = await fetch(`/subscription?writer=${writer}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (result.result) {
      onToggleAlert("구독이 취소되었습니다.");
      setSub(false);
      return true;
    } else {
      onToggleAlert("구독 취소에 실패했습니다.", true);

      return false;
    }
  });
  return { sub, subscribe, unSubscribe };
}
