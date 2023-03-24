import React from "react";
import styled from "styled-components";

const BtnCss = styled.button`
  background: none;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1.6rem;
  font-weight: 800;
  /* color: ${(props) => (props.color ? props.color : "#000000")}; */
  /* background-color: ${(props) => (props.bg ? props.bg : "none")}; */
  transition: 0.3s all ease-out;
  cursor: pointer;
  /* &:hover {
    transform: scale(1.1);
  } */
  @media (max-width: 640px) {
    font-size: 1.6rem;
  }
`;

const ColorButton = styled(BtnCss)`
  background-color: ${({ theme }) => theme.btnColor};
  color: ${({ theme }) => theme.oppositeColor};

  &:hover {
    background-color: ${({ theme }) => theme.btnHover};
  }
`;

export default function Button({ bg, color, children, onClick }) {
  return (
    <BtnCss bg={bg} color={color} onClick={onClick}>
      {children}
    </BtnCss>
  );
}

function ReloadButton({ children, onClick }) {
  return (
    <BtnCss onClick={onClick} bg={"white"}>
      {children}
    </BtnCss>
  );
}

export { ReloadButton, BtnCss, ColorButton };
