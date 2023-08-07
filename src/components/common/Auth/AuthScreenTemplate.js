import React from "react";
import styled from "styled-components";
import { CloseButton } from "../button/Button";
import media from "../../../lib/style/media";

const AuthScreenBlock = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  h1,
  h2,
  h3 {
    margin: 1.5rem 0;
  }
`;

const CenterWrap = styled.div`
  width: calc(var(--width) / 2);
  background-color: ${({ theme }) => theme.bgColor};
  padding: 2rem 4rem;
  border-radius: 4px;

  ${media.large} {
    width: calc(var(--width) * 0.75);
  }

  ${media.medium} {
    width: var(--width);
  }
`;

const CloseAndToggle = styled.div`
  display: flex;
  justify-content: space-between;

  .signButton {
    color: ${({ theme }) => theme.greyColor};
    cursor: pointer;
  }
`;

export default function AuthScreenTemplate({
  screenOff,
  onToggleLoginVisible,
  login,
  register,
  isLoginVisible,
  socialLogin,
}) {
  return (
    <AuthScreenBlock>
      <CenterWrap>
        <CloseAndToggle>
          <CloseButton onClick={screenOff}></CloseButton>
          <button className='signButton' onClick={onToggleLoginVisible}>
            {isLoginVisible ? "회원가입" : "로그인 하러가기"}
          </button>
        </CloseAndToggle>
        {isLoginVisible ? login : register}
        {isLoginVisible && socialLogin}
      </CenterWrap>
    </AuthScreenBlock>
  );
}
