import { postValid } from "./validation";

/**
 * ? Submit Post to Server
 * @param {*} obj
 */
async function postBlogPost(obj) {
  const data = { ...obj };
  if (!postValid(data)) {
    console.log("유효성 검사 오류");
    return false;
  }
  await fetch(`/posts`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return true;
}

export { postBlogPost };
