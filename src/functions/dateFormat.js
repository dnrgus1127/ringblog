export function onlyDate(dateTime) {
  const date = new Date(dateTime);
  const createDate = `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;

  return createDate;
}

/**
 * 시간 문자열을 인자로 받아서 상대적인 시간(문자열)을 반환하는 함수
 * @param {DateTime} dateTime
 * @returns
 */
function relativeDate(dateTime) {
  const date = new Date(dateTime);
  const now = new Date();
  let relativeTime = "";

  let tmp = now.getTime() - date.getTime();
  tmp = Math.trunc(tmp / 1000);

  if (tmp < 3600) {
    // 한시간 이내면
    relativeTime = `${Math.trunc(tmp / 60)}분전`;
  } else if (tmp < 86400) {
    // 하루 이내면
    relativeTime = `${Math.trunc(tmp / 3600)}시간 전`;
  } else if (tmp < 604800) {
    // 일주일 이내면
    relativeTime = `${Math.trunc(tmp / 86400)}일 전`;
  } else if (tmp < 2592000) {
    //한달 이내면
    relativeTime = `${Math.trunc(tmp / 604800)}주 전`;
  } else {
    relativeTime = `${Math.trunc(tmp / 2592000)}달 전`;
  }
  return relativeTime;
}

export { relativeDate };
