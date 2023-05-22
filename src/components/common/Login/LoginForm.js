import React, { useState } from "react";
import styled from "styled-components";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import { ColorButton } from "../../Button";
import { useSelector } from "react-redux";
import media from "../../../lib/style/media";

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

  h1,
  h2,
  h3 {
    margin: 1.5rem 0;
  }

  ${media.large} {
    width: calc(var(--width) * 0.75);
  }

  ${media.medium} {
    width: var(--width);
  }
`;

const SignDiv = styled.div`
  display: flex;
  justify-content: space-between;

  .signButton {
    color: ${({ theme }) => theme.greyColor};
    cursor: pointer;
  }
`;

const XButton = styled(ColorButton)`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.oppositeColor};
  width: 4rem;
  height: 4rem;
  padding: 0;
  align-items: center;
  display: flex;
  svg {
    display: block;
    margin: 0 auto;
  }

  @media (max-width: 640px) {
    width: 3.5rem;
    height: 3.5rem;
  }
`;

export default function LoginForm({ onOff }) {
  const { loggedIn } = useSelector((state) => state.login);
  const [sign, setSign] = useState(false);

  const changeSign = () => {
    setSign((prevState) => !prevState);
  };

  if (loggedIn) return;

  return (
    <Container>
      <CenterWrap>
        <SignDiv>
          <XButton as='div' onClick={onOff}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='40%'
              height='40%'
              viewBox='0 0 24 24'
            >
              <path d='M24 3.752l-4.423-3.752-7.771 9.039-7.647-9.008-4.159 4.278c2.285 2.885 5.284 5.903 8.362 8.708l-8.165 9.447 1.343 1.487c1.978-1.335 5.981-4.373 10.205-7.958 4.304 3.67 8.306 6.663 10.229 8.006l1.449-1.278-8.254-9.724c3.287-2.973 6.584-6.354 8.831-9.245z' />
            </svg>
          </XButton>
          <button className='signButton' onClick={changeSign}>
            {sign ? "로그인 하러가기" : "회원가입"}
          </button>
        </SignDiv>
        {sign ? <RegisterComponent /> : <LoginComponent onOff={onOff} />}
      </CenterWrap>
    </Container>
  );
}
