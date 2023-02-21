import { useEffect, useState } from "react";

export function useGetPost(search) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    fetch(`/posts${search ? `?search=${search}` : ``}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .then(() => setLoading(false))
      .catch(setError);
  }, [search]);

  return { data, loading, error };
}
