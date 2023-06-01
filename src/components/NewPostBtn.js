import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  position: relative;
  z-index: 9999;
  background: none;
  border: none;
  color: ${({ theme }) => theme.color};
  border: 2px solid ${({ theme }) => theme.color};
  padding: 4px 1.5rem;
  border-radius: 18px;
  font-size: 0.8em;
  font-weight: 400;
  font-family: "Noto Sans KR", sans-serif;
  transition: 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.pointColor};
    border-color: ${({ theme }) => theme.pointColor};
    color: ${({ theme }) => theme.oppositeColor};
    font-weight: 800;
  }
`;

export default function NewPostBtn() {
  return (
    <Link to='/writeNewPost'>
      <Button>포스트 작성</Button>
    </Link>
  );
}
