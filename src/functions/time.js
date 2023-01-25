function timeStamp() {
  const date = new Date();
  const now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return now;
}

export { timeStamp };
