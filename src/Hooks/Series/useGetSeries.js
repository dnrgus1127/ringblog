import { useEffect } from "react";
import { useState } from "react";

export default function useGetSeries() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetch(``)
      .then((res) => res.json())
      .then(setData)
      .then(setLoading(false))
      .catch(setError);
  }, []);
}
