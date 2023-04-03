import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Error from "../../components/common/Error/Error";

export default function useRcmndList() {
  const [userComments, setData] = useState([]);
  const { loggedIn, loggedUser } = useSelector((state) => state.login);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    console.log(userComments);
  }, [userComments]);

  useEffect(() => {
    if (!loggedIn) {
      setLoading(false);
      setError(<Error text={"로그인이 필요합니다."} />);
      return;
    }
    fetch(`/rcmnd/RcmndedPosts?username=${loggedUser.username}`)
      .then((res) => res.json())
      .then(setData)
      .then(() => setLoading(false));
  }, [loggedUser, setData, loggedIn]);

  return { userComments, error, loading };
}
