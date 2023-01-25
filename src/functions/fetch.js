export function postBlogPost(obj) {
  const data = { ...obj };
  console.log(data);
  fetch(`/posts`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => console.log(result));
}
