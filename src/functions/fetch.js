import { timeStamp } from "./time";
import { postValid } from "./validation";

/**
 * ? Submit Post to Server
 * @param {Post} obj post object
 */
async function uploadContents(obj) {
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

async function uploadImg(file) {
  let result = "";
  const formData = new FormData();
  formData.append("img", file);
  await fetch("/imgUpload", {
    method: "post",
    body: formData,
  }).then((res) => (result = res.json()));

  return result;
}

async function uploadPost(imgFile, postData) {
  uploadImg(imgFile).then((result) =>
    uploadContents({ ...postData, thumbnailPath: result })
  );
  return true;
}

function quotationMark(content) {
  return content.replaceAll('"', '\\"');
}

export { uploadPost };
