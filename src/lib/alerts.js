function alertMsg(type) {
  if (type === 100) {
    alert("로그인이 만료되었습니다.");
    return true;
  }
  return false;
}

export { alertMsg };
