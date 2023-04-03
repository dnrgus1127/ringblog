import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useCmtLoggedUser(reFetch) {
  const { loggedUser, loggedIn } = useSelector((state) => state.login);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (!loggedIn) {
      setLoading(false);
      return;
    }
    fetch(`/allCommentByUser?userId=${loggedUser.userId}`)
      .then((res) => res.json())
      .then((result) => setData(result))
      .then(() => setLoading(false))
      .catch(setError);
  }, [loggedUser, loggedIn, reFetch]);

  return { data, loading, error };
}
