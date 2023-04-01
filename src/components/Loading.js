import React from "react";
import styled, { keyframes } from "styled-components";

const dotFrame = keyframes`
 0% {
    opacity: 0;
 }
 100% {
    opacity: 1;
 }
`;

const LoadingBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  text-align: center;
  z-index: 10000;
  h1 {
    color: white;
  }
  span {
    opacity: 0;
  }
  span:nth-child(1) {
    opacity: 1;
  }

  span:nth-child(2) {
    animation: ${dotFrame} 1s 2s infinite;
  }
  span:nth-child(3) {
    animation: ${dotFrame} 1s 1s infinite;
  }
`;

const LoadingAnimation = keyframes`
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
`;

const LoadingSpinner = styled.div`
  position: relative;
  width: 15rem;
  height: 15rem;
  margin: 0 auto;
  margin-bottom: 4rem;

  .loadingBack,
  .loadingBar {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    width: inherit;
    height: inherit;
    border: 8px solid ${({ theme }) => theme.greyColor};
  }

  .loadingBar {
    border-top: 8px solid ${({ theme }) => theme.btnColor};
    animation: ${LoadingAnimation} 1s infinite linear;
  }

  // 모바일 CSS
  @media (max-width: 640px) {
    width: 10rem;
    height: 10rem;

    .loadingBack,
    .loadingBar {
      border: 4px solid ${({ theme }) => theme.greyColor};
    }
    .loadingBar {
      border-top: 4px solid ${({ theme }) => theme.btnColor};
      animation: ${LoadingAnimation} 1s infinite linear;
    }
  }
`;

export default function Loading({ text = "로딩중" }) {
  return (
    <LoadingBox>
      <div>
        <LoadingSpinner>
          <div className='loadingBack'></div>
          <div className='loadingBar'></div>
        </LoadingSpinner>
        <h1>
          {text}
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </h1>
      </div>
    </LoadingBox>
  );
}
