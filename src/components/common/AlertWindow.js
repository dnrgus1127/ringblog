import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import media from "../../lib/style/media";
import useAlert from "../../Hooks/common/useAlert";

const Window = styled.div`
  position: fixed;
  top: 1rem;
  left: 40vw;
  min-width: 20vw;
  background-color: ${({ theme }) => theme.bgElement3};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 4px;
  z-index: 20000;
  ${({ theme }) =>
    (props) =>
      props.fail && { backgroundColor: `${theme.warning}` }};

  ${media.small} {
    width: 100vw;
    top: 0;
    left: 0;
  }
`;

const AlertMsg = styled.p`
  padding: 1rem 2rem;
`;

const ProgressAnimation = keyframes`
    0% {
        width: 0;
    }
    100% {
        width: 100%;
    }
`;

const ProgressLine = styled.div`
  height: 2px;
  width: 100%;
  background-color: ${({ theme }) => theme.btnColor};
  animation: ${ProgressAnimation} 1s;
`;

export default function AlertWindow() {
  const { alertMsg, onFail } = useSelector((state) => state.common.alert);
  const { onToggleAlert } = useAlert();

  useEffect(() => {
    const timer = setTimeout(() => {
      onToggleAlert();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [onToggleAlert]);
  return (
    <Window fail={onFail}>
      <AlertMsg>{alertMsg}</AlertMsg>
      <ProgressLine />
    </Window>
  );
}
