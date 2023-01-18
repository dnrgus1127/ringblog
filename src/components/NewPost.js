import React from "react";
import styled from "styled-components";

const Button = styled.button`
  z-index: 9999;

  background: none;
  border: none;
  color: ${(props) => (props.dark ? "white" : "black")};
  border: 2px solid ${(props) => (props.dark ? "white" : "black")};
  padding: 4px 1.5rem;
  border-radius: 18px;
  font-size: 0.8em;
  font-weight: 400;
  font-family: "Noto Sans KR", sans-serif;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.dark ? "white" : "black")};
    color: ${(props) => (props.dark ? "black" : "white")};
    font-weight: 800;
  }
`;

export default function NewPost({ dark }) {
  return <Button dark={dark}>포스트 작성</Button>;
}
