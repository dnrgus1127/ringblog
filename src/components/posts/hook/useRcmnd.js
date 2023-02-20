import { useContext, useEffect } from "react";
import { useState } from "react";
import { alertMsg } from "../../../functions/alerts";
import { Context } from "../../../functions/Login/LoginProvider";

/**
 *
 * @param {*} postId
 * @returns { rcmnd : state, clickRcmnd : function}
 */
export function useRcmnd(postId) {
  const [rcmnd, setRcmnd] = useState();
  const { loggedUser, loggedIn, setLoggedIn } = useContext(Context);

  // 로그인 되어 있을 때만
  useEffect(() => {
    if (loggedIn) {
      fetch(`/rcmnd?postId=${postId}&username=${loggedUser.username}`)
        .then((res) => res.json())
        .then((data) => {
          setRcmnd(data.result);
        });
    }
  }, [loggedIn, loggedUser, postId]);

  // 좋아요 해제
  const unRcmnd = () => {
    fetch(`/rcmnd?postId=${postId}&username=${loggedUser.username}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (alertMsg(data.type)) {
          setLoggedIn(false);
        } else {
          setRcmnd(data.result);
        }
      });
  };
  // 좋아요
  const doRcmnd = () => {
    fetch(`/rcmnd`, {
      method: "POST",
      body: JSON.stringify({ postId: postId, username: loggedUser.username }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (alertMsg(data.type)) {
          setLoggedIn(false);
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
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  return { rcmnd, clickRcmnd };
}
