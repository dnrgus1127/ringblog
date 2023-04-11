import React from "react";
import styled from "styled-components";

const FullScreen = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10003;

  display: flex;
  align-items: center;
  justify-content: center;

  div {
    width: 80rem;
    height: 50rem;
    text-align: end;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export default function FullScreenProfile({ src, close }) {
  return (
    <FullScreen>
      <div>
        <button onClick={close}>닫기</button>
        <img src={src} alt={src} />
      </div>
    </FullScreen>
  );
}
