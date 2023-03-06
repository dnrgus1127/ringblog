import { useContext, useState } from "react";
import { useCallback } from "react";
import { Context } from "../../functions/Login/LoginProvider";
import { FullStamp } from "../../functions/time";

export default function useCmtMdfd(commentId, initState, afterFetch) {
  const [comment, setComment] = useState(initState);
  const { setLoggedIn } = useContext(Context);

  const commentMdfd = useCallback(() => {
    fetch(`comments?commentId=${commentId}`, {
      method: "PATCH",
      body: JSON.stringify({ comment: comment, mdfdDate: FullStamp() }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.type !== 0) {
          alert(data.msg);
          if (data.type < 200) {
            setLoggedIn(false);
          }
        }
      })
      .then(afterFetch && afterFetch());
  }, [commentId, afterFetch, setLoggedIn, comment]);

  return { comment, commentMdfd, setComment };
}
