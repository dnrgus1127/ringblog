import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Context } from "../../functions/Login/LoginProvider";
import { ColorButton } from "../Button";

const Input = styled.input`
  padding: 0.5rem 1rem;
  display: block;
  width: 100%;
  height: 4rem;
  background-color: ${({ theme }) => theme.bgElement};
  border: 1px solid
    ${({ theme }) =>
      (props) =>
        props.fail ? "red" : theme.btnColor};
  border-radius: 4px;
  margin-bottom: 2rem;
`;

const Button = styled(ColorButton)`
  font-size: 1.6rem;
  margin: 0 1rem;
`;

const Form = styled.form`
  .buttonBox {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default function LoginComponent({ onOff }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const { setLoggedUser, setLoggedIn } = useContext(Context);
  const [authFail, setAuthFail] = useState(false);

  // 로그인 요청
  const submit = (e) => {
    e.preventDefault();

    //!- Fetch Component 수정 필요
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({ userId: id, password: pw }),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((result) => {
        // 로그인 실패 시 {authSuccess(bool), failMessage(String)}
        if (!result.authSuccess) {
          setAuthFail(true);
        } else {
          // 로그인 성공 시 {userId(String), username(String)} Object result
          setLoggedUser(result);
          setLoggedIn(true);
          onOff();
        }
      });
  };
  return (
    <React.Fragment>
      <h2>로그인</h2>

      <h3>RingBlog ID 로그인</h3>
      <Form onSubmit={submit}>
        <Input
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
          type='text'
        />
        <Input
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
          }}
          type='password'
          fail={authFail}
        />
        {authFail ? <LoginFail setClose={setAuthFail} /> : null}
        <div className='buttonBox'>
          <Button bg={""} type='submit'>
            로그인
          </Button>
        </div>
      </Form>

      {/* <h3>소셜 계정 ID 로그인</h3> */}
    </React.Fragment>
  );
}

const FailBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: start;

  background-color: rgba(246, 150, 23, 0.9);
  border-radius: 4px;
  border: 1.5px solid ${({ theme }) => theme.greyColor};
  padding: 1rem 2rem;
  margin: 1rem 0;

  h5,
  p,
  button {
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  }
  h5 {
    margin: 0;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.4rem;
    font-weight: 800;
    margin-bottom: 1rem;
  }

  a {
    color: lightgrey;
    border-bottom: 1.5px solid lightgrey;
  }

  .closeButton {
    display: inline-block;
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    font-weight: 800;
    cursor: pointer;
  }
`;

function LoginFail({ setClose }) {
  return (
    <FailBox>
      <button
        className='closeButton'
        onClick={() => {
          setClose(false);
        }}
      >
        닫기
      </button>
      <div>
        <h5>⚠️로그인 실패</h5>
        <p>비밀번호가 올바르지 않습니다.</p>
        <p>CapsLock, 대소문자, 특수문자 입력에 주의하여 다시 입력해 주세요.</p>

        <p>
          <a href='/'>로그인과 관련되어 궁금한게 있으신가요?</a>
        </p>
      </div>
    </FailBox>
  );
}
