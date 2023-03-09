import { useState } from "react";

export default function useFetchPost() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const Post = (uri, bodyData) => {
    console.log(bodyData);
    fetch(uri, {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setData)
      .then(() => {
        setLoading(false);
      })
      .then(setError);
  };
  return [Post, data, loading, error];
}
