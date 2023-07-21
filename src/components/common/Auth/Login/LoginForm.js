import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { InputCss } from "../../../../lib/style/InputCss";
import { ConfirmButton } from "../../button/Button";
import LoginFailed from "./LoginFailed";

const Input = styled(InputCss)``;

const Form = styled.form`
  text-align: center;
`;

export default function LoginForm({
  onLogin,
  id,
  pw,
  authFail,
  failType,
  setId,
  setPw,
  disabledLogin,
}) {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <React.Fragment>
      <h2>로그인</h2>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onLogin();
        }}
      >
        <Input
          ref={inputRef}
          value={id}
          placeholder='아이디 입력'
          onChange={(e) => {
            setId(e.target.value);
          }}
          type='text'
          fail={failType === 0}
        />
        <Input
          placeholder='패스워드 입력'
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
          }}
          type='password'
          fail={failType === 1}
        />
        <LoginFailed type={failType} isLoginFailed={authFail} />
        <ConfirmButton type='submit' disabled={disabledLogin}>
          로그인
        </ConfirmButton>
      </Form>
    </React.Fragment>
  );
}
