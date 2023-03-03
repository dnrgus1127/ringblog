import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../../../../functions/Login/LoginProvider";

export default function useCmtLoggedUser() {
  const { loggedUser, loggedIn } = useContext(Context);
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
  }, [loggedUser, loggedIn]);

  return { data, loading, error };
}
