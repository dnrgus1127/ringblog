import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CenterWrap = styled.div`
  width: calc(var(--width) / 2);
  background-color: ${({ theme }) => theme.bgColor};
  padding: 2rem 4rem;
  border-radius: 4px;

  .buttonBox {
    display: flex;
    align-items: center;
    padding: 1rem 0;
    justify-content: center;
  }

  h1,
  h2,
  h3 {
    margin: 1.5rem 0;
  }

  @media (max-width: 640px) {
    width: var(--width);
  }
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  display: block;
  width: 100%;
  height: 4rem;
  background-color: ${({ theme }) => theme.bgElement};
  border: 1px solid ${({ theme }) => theme.btnColor};
  border-radius: 4px;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.btnColor};
  border-radius: 4px;
  padding: 1rem 1rem;
  color: ${({ theme }) => theme.oppositeColor};
  font-weight: 800;
  font-size: 1.6rem;

  &:hover {
    background-color: ${({ theme }) => theme.btnHover};
  }
`;

const Form = styled.form`
  button {
    display: block;
    margin: 0 auto;
  }
`;

export default function LoginForm({ onOff, setUser }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const submit = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({ userId: id, password: pw }),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((result) => setUser(result));
  };

  return (
    <Container>
      <CenterWrap>
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
          />
          <Button bg={""} type='submit'>
            로그인
          </Button>
        </Form>

        <div className='buttonBox'>
          <Button
            onClick={() => {
              fetch("/logout");
            }}
          >
            로그아웃
          </Button>
          <Button onClick={onOff}> 창닫기 </Button>
        </div>
        <h3>소셜 계정 ID 로그인</h3>
      </CenterWrap>
    </Container>
  );
}
