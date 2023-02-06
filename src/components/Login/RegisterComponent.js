import React, { useState } from "react";
import styled from "styled-components";
import { ColorButton } from "../Button";

const Wrapper = styled.div``;

const Button = styled(ColorButton)`
  font-size: 1.6rem;
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

  input {
    background-color: ${({ theme }) => theme.bgElement3};
    display: block;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.btnColor};
    font-size: 1.6rem;
    width: 100%;
    padding: 0.6rem 1rem;
  }

  button {
    display: block;
    margin: 2rem auto;
  }
`;

// const ErrorMessage = styled.p`
//   color: red;
// `;

export default function RegisterComponent() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    fetch("/register", {
      method: "POST",
      body: JSON.stringify({ userId: id, password: password, name: name }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res);
        res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err.message));
    //!- 작업중
  };

  return (
    <Wrapper>
      <h2>회원 가입</h2>
      <Form onSubmit={submit}>
        <label htmlFor='id'>아이디</label>
        <input
          type='text'
          name='id'
          placeholder='아이디를 입력하세요'
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />

        <label htmlFor='password'>비밀번호</label>
        <input
          type='password'
          name='password'
          placeholder='비밀번호를 입력하세요'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label htmlFor='username'>이름(닉네임)</label>
        <input
          type='text'
          name='username'
          placeholder='이름(닉네임)을 입력하세요'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Button type='submit'>계정 생성</Button>
      </Form>
    </Wrapper>
  );
}
