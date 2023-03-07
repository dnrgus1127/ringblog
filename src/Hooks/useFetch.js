import { useEffect } from "react";
import { useState } from "react";

export function useFetch(uri, options) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (!uri) return;
    fetch(uri, options)
      .then((res) => {
        if (!res.ok) {
          if (res.status > 500) {
            setError(res.status + "서버 통신 에러 : " + res.statusText);
          } else {
            setError(res.status + "에러 : " + res.statusText);
          }

          return null;
        }
        return res.json();
      })
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [uri, options]);
  return { loading, data, error };
}
