import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/loginState";

/**
 *
 * @returns
 */
export default function useCmtDel(afterFetch, successFetch) {
  const [result, setResult] = useState();
  const dispatch = useDispatch();

  const setLogout = () => {
    dispatch(loginActions.setLogout());
  };

  const delCmt = (id) => {
    fetch(`/comments?commentId=${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        let type = result.type;
        if (type !== 0) {
          if (type === 100) {
            setLogout();
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
