import { timeStamp } from "./time";
import { postValid } from "./validation";

//-----------------------------------------------get-----------//

async function getPostByIndex(index) {
  let data = await fetch(`/posts/${index}`).then((data) => data.json());

  return data;
}

//-----------------------------------------------post----------//
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
  if (imgFile) {
    uploadImg(imgFile).then((result) =>
      uploadContents({ ...postData, thumbnailPath: result })
    );
  } else {
    uploadContents({ ...postData });
  }

  return true;
}

function quotationMark(content) {
  return content.replaceAll('"', '\\"');
}

//포스트 수정--------------------------------------------------------------------------------//

async function updatePost(id, obj) {
  let data = {
    ...obj,
    contents: quotationMark(obj.contents),
  };
  let result = await fetch(`/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });

  return result;
}

//포스트 삭제-------------------------------------------------------------------//

async function deletePost(id) {
  let result = await fetch(`/posts/${id}`, {
    method: "DELETE",
  });

  return result;
}
export { uploadPost, getPostByIndex, updatePost, deletePost, uploadImg };
