import React from "react";
import styled, { keyframes } from "styled-components";
import { ColorButton, BtnCss } from "./Button";

const BackgroundCon = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10003;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OpenAnimation = keyframes`
 0% {
    transform: translateY(100%);
    opacity: .3;
 }

 100% {
    transform: translateY(0%);
    opacity: 1;
 }

`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgElement3};
  width: 30vw;
  border-radius: 6px;
  padding: 3rem 2.5rem;

  animation: ${OpenAnimation} 0.4s;

  h2,
  p {
    margin-bottom: 2rem;
  }

  h2 {
  }

  p {
    color: ${({ theme }) => theme.greyColor};
  }

  .buttonWrap {
    text-align: end;
  }

  button {
    font-size: 1.4rem;
  }
`;

const OkButton = styled(ColorButton)`
  margin: 0;
  margin-left: 2rem;
`;

const CancelButton = styled(BtnCss)`
  margin: 0;
  color: ${({ theme }) => theme.btnColor};
`;

export default function ConfirmWindow({ title, message, cancel, ok }) {
  return (
    <BackgroundCon>
      <Container>
        <div>
          <h2>{title}</h2>
          <p>{message}</p>
          <div className='buttonWrap'>
            <CancelButton onClick={cancel}>취소</CancelButton>
            <OkButton onClick={ok}>확인</OkButton>
          </div>
        </div>
      </Container>
    </BackgroundCon>
  );
}
