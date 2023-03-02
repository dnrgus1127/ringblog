import { useEffect, useState } from "react";

export default function useSubscription(writer) {
  const [sub, setSub] = useState(false);

  useEffect(() => {
    fetch(`/subscription?writer=${writer}`)
      .then((res) => res.json())
      .then((data) => setSub(data.result));
  }, [writer]);

  const subscribe = () => {
    fetch(`/subscription?writer=${writer}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setSub(data.result));
  };
  const unSubscribe = () => {
    fetch(`/subscription?writer=${writer}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => setSub(!data.result));
  };

  return { sub, subscribe, unSubscribe };
}
