import { timeStamp } from "./time";
import { postValid } from "./validation";

/**
 * ? Submit Post to Server
 * @param {Post} obj post object
 */
async function postBlogPost(obj) {
  const data = {
    ...obj,
    createDateTime: timeStamp(),
    lastMdfdDay: timeStamp(),
    contents: quotationMark(obj.contents),
  };
  if (!postValid(data)) {
    console.log("유효성 검사 오류");
    return false;
  } else {
    console.log(data);
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

function quotationMark(content) {
  return content.replaceAll('"', '\\"');
}

export { postBlogPost };
