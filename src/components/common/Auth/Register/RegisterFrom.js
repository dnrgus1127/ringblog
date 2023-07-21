import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { InputCss } from "../../../../lib/style/InputCss";
import { ConfirmButton } from "../../button/Button";

const RegisterFormBlock = styled.div`
  h2 {
    margin-bottom: 1rem;
  }
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

export default function RegisterFrom({
  id,
  password,
  name,
  createAccount,
  isCheckId,
  isCheckName,
  isCheckPw,
  disableCreateAccount,
  valid,
}) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <RegisterFormBlock>
      <React.Fragment>
        <h2>회원 가입</h2>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            createAccount();
          }}
        >
          <label htmlFor='id'>아이디</label>
          <Input
            ref={inputRef}
            type='text'
            name='id'
            placeholder='아이디를 입력하세요'
            value={id}
            onChange={valid}
          />
          {isCheckId.isCheck && (
            <ErrorMessage>{isCheckId.message}</ErrorMessage>
          )}

          <label htmlFor='password'>비밀번호</label>
          <Input
            type='password'
            name='password'
            placeholder='패스워드를 입력하세요'
            value={password}
            onChange={valid}
          />
          {isCheckPw.isCheck && (
            <ErrorMessage>{isCheckPw.message}</ErrorMessage>
          )}

          <label htmlFor='username'>이름(닉네임)</label>
          <Input
            type='text'
            name='username'
            id='username'
            placeholder='이름(닉네임)을 입력하세요'
            value={name}
            onChange={valid}
          />
          {isCheckName.isCheck && (
            <ErrorMessage>{isCheckName.message}</ErrorMessage>
          )}
          <ConfirmButton type='submit' disabled={disableCreateAccount}>
            계정 생성
          </ConfirmButton>
        </Form>
      </React.Fragment>
    </RegisterFormBlock>
  );
}
