// ? 포스트 유효성 검사 함수
function postValid({ title, contents, preview }) {
  if (!titleValid(title)) {
    return false;
  } else if (!contentValide(contents)) {
    return false;
  } else if (preview && !previewValide(preview)) {
    return false;
  }
  return true;
}

function titleValid(title) {
  // ! 스크립트 문자 제한 및 2~50글자 사이의 문자열
  let Reg = /[^%{}[]\*&#@$`]/g;

  if (Reg.test(title)) {
    alert(
      "제목에는 & ^ * $ # @ % [ ] { } \\ ` 와 같은 특수문자를 사용하실 수 없습니다."
    );
    return false;
  }
  if (title === undefined || title.length < 2) {
    alert("제목은 2글자 이상 작성해야 합니다.");
    return false;
  }
  if (title.length > 51) {
    alert("제목은 20글자 이하로 작성해야 합니다.");
    return false;
  }
  return true;
}

function contentValide(contents) {
  let len = contents.length ? contents.length : undefined;

  if (len === undefined) {
    alert("포스트 내용을 작성해 주세요!");
    return false;
  } else if (len > 10000) {
    alert("포스트 내용은 최대 10000자 까지 가능합니다.");
    return false;
  }

  return true;
}

function previewValide(preview) {
  let len = preview.length;

  if (len > 500) {
    alert("미리보기는 500자 이내로 작성할 수 있습니다.");
    return false;
  }

  return true;
}

export { postValid };
