function validUserId(userId) {
  const reg = /^(?=.*\w)(?=.*\d)[^\W]{7,16}$/g;

  return reg.test(userId);
}

function validPassword(password) {
  const reg = /^(?=.*\d)(?=.*\w)(?=.*[!@#$%^&*])[!@#$%^&*\d\w]{7,16}$/g;

  return reg.test(password);
}

function validName(name) {
  const reg = /^[A-Za-z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{1,10}$/g;

  return reg.test(name);
}

function checkPassword(pw, setState) {
  if (pw === "") {
    // id Input 빈칸 검사
    setState({
      isCheck: true,
      message: "비밀번호는 빈칸으로 둘 수 없습니다.",
    });
  } else if (!validPassword(pw)) {
    // 영,숫자 포함 8~16자 정규표현식 검사
    setState({
      isCheck: true,
      message:
        "비밀번호는 영어와 숫자, 특수문자를 포함하여 8~16자 이내여야 합니다.",
    });
  } else {
    setState({
      isCheck: false,
      message: "",
    });
  }
}

function checkId(id, setState) {
  if (id === "") {
    // id Input 빈칸 검사
    setState({
      isCheck: true,
      message: "아이디는 빈칸으로 둘 수 없습니다.",
    });
  } else if (!validUserId(id)) {
    // 영,숫자 포함 8~16자 정규표현식 검사
    setState({
      isCheck: true,
      message: "아이디는 영어와 숫자를 포함하여 8~16자 이내여야 합니다.",
    });
  } else {
    // 아이디 중복 검사
    fetch(`/register/userId?userId=${id}`)
      .then((res) => {
        if (!res.ok) {
          alert("서버가 응답하지 않습니다.");
          throw new Error(`${res.status}에러 발생`);
        }
        return res.json();
      })
      .then((data) =>
        setState({
          isCheck: data.isDuplicate,
          message: "중복된 아이디입니다.",
        })
      )
      .catch((err) => console.log(err.message));
  }
}

function checkName(name, setState) {
  if (name === "") {
    // id Input 빈칸 검사
    setState({
      isCheck: true,
      message: "이름(닉네임)은 빈칸으로 둘 수 없습니다.",
    });
  } else if (!validName(name)) {
    // 영,숫자 포함 8~16자 정규표현식 검사
    setState({
      isCheck: true,
      message: "이름(닉네임)은  2~10자 이내여야 합니다.",
    });
  } else {
    // 아이디 중복 검사
    fetch(`/register/name?name=${name}`)
      .then((res) => {
        if (!res.ok) {
          alert("서버가 응답하지 않습니다.");
          throw new Error(`${res.status}에러 발생`);
        }
        return res.json();
      })
      .then((data) =>
        setState({
          isCheck: data.isDuplicate,
          message: "중복된 이름(닉네임)입니다.",
        })
      )
      .catch((err) => console.log(err.message));
  }
}

export { validUserId, validPassword, checkId, checkName, checkPassword };
