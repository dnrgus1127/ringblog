import React from "react";
import styled, { keyframes } from "styled-components";
import { BtnCss, ColorButton } from "../Button";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
  z-index: 9000;
  display: ${(props) => (props.visible ? "flex" : "none")};
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

const Window = styled.div`
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

export default function PopupOkCancle({
  visible,
  children,
  onCancel,
  onConfirm,
  title,
}) {
  return (
    <Container visible={visible}>
      <Window>
        <div>
          <h2>{title}</h2>
          <p>{children}</p>
          <div className='buttonWrap'>
            <CancelButton onClick={onCancel}>취소</CancelButton>
            <OkButton onClick={onConfirm}>확인</OkButton>
          </div>
        </div>
      </Window>
    </Container>
  );
}
