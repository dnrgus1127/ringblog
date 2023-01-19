export function onlyDate(dateTime) {
  const date = new Date(dateTime);
  const createDate = `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;

  return createDate;
}
