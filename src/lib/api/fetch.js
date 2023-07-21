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

//포스트 삭제-------------------------------------------------------------------//

async function deletePost(id) {
  let result = await fetch(`/posts/${id}`, {
    method: "DELETE",
  });

  return result;
}
export { deletePost, uploadImg };
