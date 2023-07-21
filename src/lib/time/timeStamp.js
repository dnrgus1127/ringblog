function timeStamp() {
  const date = new Date();
  const now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return now;
}

function FullStamp() {
  const date = new Date();
  const now = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  return now;
}

export { timeStamp, FullStamp };
