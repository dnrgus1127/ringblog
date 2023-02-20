export function commentValid(text) {
  const reg = /^[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣0-9!@#$%^&*\s.?]*$/g;

  if (text !== "") return reg.test(text);
  else return true;
}
