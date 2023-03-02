import { useEffect, useState } from "react";

export default function useSubPost(user) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`/postsInfo?writer=${user}`)
      .then((res) => res.json())
      .then((result) => setData(result));
  }, [user]);

  return { data };
}
