import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertMsg } from "../../../lib/alerts";
import { loginActions } from "../../../store/loginState";

/**
 *
 * @param {*} postId
 * @returns { rcmnd : state, clickRcmnd : function}
 */
export function useRcmnd(postId) {
  const [rcmnd, setRcmnd] = useState();
  const { loggedUser, loggedIn } = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(loginActions.setLogout());
  };

  // 로그인 되어 있을 때만
  useEffect(() => {
    if (loggedIn) {
      fetch(`/rcmnd?postId=${postId}&userId=${loggedUser.userId}`)
        .then((res) => res.json())
        .then((data) => {
          setRcmnd(data.result);
        });
    } else {
      setRcmnd(0);
    }
  }, [loggedIn, loggedUser, postId]);

  // 좋아요 해제
  const unRcmnd = () => {
    fetch(`/rcmnd?postId=${postId}&userId=${loggedUser.userId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (alertMsg(data.type)) {
          logout();
        } else {
          setRcmnd(data.result);
        }
      });
  };
  // 좋아요
  const doRcmnd = () => {
    fetch(`/rcmnd`, {
      method: "POST",
      body: JSON.stringify({ postId: postId, userId: loggedUser.userId }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (alertMsg(data.type)) {
          logout();
        } else {
          setRcmnd(data.result);
        }
      });
  };

  const clickRcmnd = () => {
    if (loggedIn) {
      if (rcmnd) {
        unRcmnd();
      } else {
        doRcmnd();
      }
    }
  };

  return { rcmnd, clickRcmnd };
}
