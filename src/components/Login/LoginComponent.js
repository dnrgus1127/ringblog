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
  border: 1px solid ${({ theme }) => theme.btnColor};
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
  const submit = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({ userId: id, password: pw }),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((result) => {
        setLoggedUser(result);
        setLoggedIn(true);
        onOff();
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
        />
        <div className='buttonBox'>
          <Button bg={""} type='submit'>
            로그인
          </Button>
        </div>
      </Form>

      <h3>소셜 계정 ID 로그인</h3>
    </React.Fragment>
  );
}
