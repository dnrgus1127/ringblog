import React, { useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import {
  checkId,
  checkName,
  checkPassword,
} from "../../../functions/Login/AccountValidation";
import { InputCss } from "../../../styledCss/InputCss";
import { ColorButton } from "../../Button";
import { Fetch } from "../../Fetch";

const Wrapper = styled.div`
  h2 {
    margin-bottom: 1rem;
  }
`;

const Button = styled(ColorButton)`
  font-size: 1.6rem;
`;

const Input = styled(InputCss)`
  margin: 0 auto;
`;

const Form = styled.form`
  input,
  button {
    margin: 0 auto;
  }
  label {
    margin: 1rem 0;
    display: inline-block;
  }

  button {
    display: block;
    margin: 2rem auto;
  }
`;

const ErrorMessage = styled.p`
  padding-top: 1rem;
  color: ${({ theme }) => theme.warning};
`;

const CompleteSign = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  h3 {
    font-size: 4rem;
    font-weight: 800;
    text-shadow: 0px 0px 15px rgba(128, 128, 128, 0.4);
  }
  p {
    font-size: 2rem;
    font-weight: 800;
  }
`;

export default function RegisterComponent() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const inputRef = useRef();

  const [isCheckId, setIsCheckId] = useState({
    // 중복, 유효성 검사, 빈칸 시 isCheck true
    isCheck: false,
    message: "",
  });
  const [isCheckName, setIsCheckName] = useState({
    isCheck: false,
    message: "",
  });
  const [CheckedPw, setCheckedPw] = useState({
    isCheck: false,
    message: "",
  });

  const submit = (e) => {
    e.preventDefault();

    if (isCheckId.isCheck || isCheckName.isCheck || CheckedPw.isCheck) {
      alert("입력 칸을 다시 채워 주세요!");
      return false;
    }
    setSuccess(true);
  };

  const validUserId = () => {
    checkId(id, setIsCheckId);
  };

  const validUserName = () => {
    console.log(name);
    checkName(name, setIsCheckName);
  };

  const validPassword = () => {
    checkPassword(password, setCheckedPw);
  };

  function fetchSucces({ data }) {
    return (
      <CompleteSign>
        <div style={{ textAlign: "center" }}>
          <h3>회원 가입 성공</h3>
          <p>로그인해 주세요</p>
        </div>
      </CompleteSign>
    );
  }
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <Wrapper>
      {success ? (
        <div style={{ height: "40vh" }}>
          <Fetch
            uri='/register'
            options={{
              method: "POST",
              body: JSON.stringify({
                userId: id,
                password: password,
                name: name,
              }),
              headers: { "Content-Type": "application/json" },
            }}
            renderSuccess={fetchSucces}
          />
        </div>
      ) : (
        //!- 작업중 renderSuccess 문제

        <React.Fragment>
          <h2>회원 가입</h2>
          <Form onSubmit={submit}>
            <label htmlFor='id'>아이디</label>
            <Input
              ref={inputRef}
              type='text'
              name='id'
              placeholder='아이디를 입력하세요'
              value={id}
              onChange={(e) => {
                setId(e.target.value);
              }}
              onBlur={validUserId}
            />
            {isCheckId.isCheck ? (
              <ErrorMessage>{isCheckId.message}</ErrorMessage>
            ) : null}

            <label htmlFor='password'>비밀번호</label>
            <Input
              type='password'
              name='password'
              placeholder='패스워드를 입력하세요'
              value={password}
              onBlur={validPassword}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {CheckedPw.isCheck ? (
              <ErrorMessage>{CheckedPw.message}</ErrorMessage>
            ) : null}

            <label htmlFor='username'>이름(닉네임)</label>
            <Input
              type='text'
              name='username'
              placeholder='이름(닉네임)을 입력하세요'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              onBlur={validUserName}
            />
            {isCheckName.isCheck ? (
              <ErrorMessage>{isCheckName.message}</ErrorMessage>
            ) : null}
            <Button type='submit'>계정 생성</Button>
          </Form>
        </React.Fragment>
      )}
    </Wrapper>
  );
}
