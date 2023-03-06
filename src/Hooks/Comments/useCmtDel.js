import { useContext } from "react";
import { useState } from "react";
import { Context } from "../../functions/Login/LoginProvider";

/**
 *
 * @returns
 */
export default function useCmtDel(afterFetch, successFetch) {
  const [result, setResult] = useState();
  const { setLoggedIn } = useContext(Context);

  const delCmt = (id) => {
    fetch(`/comments?commentId=${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        let type = result.type;
        if (type !== 0) {
          if (type === 100) {
            setLoggedIn(false);
          } else if (type === 101) {
          }
          alert(result.msg);
        } else {
          setResult(true);
          successFetch && successFetch();
        }
        afterFetch && afterFetch();
      });
  };

  return { delCmt, result };
}
