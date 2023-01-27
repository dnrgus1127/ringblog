import React from "react";
import styled from "styled-components";

const BtnCss = styled.button`
  background: none;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-family: inherit;
  font-size: 2rem;
  font-weight: 800;
  margin-right: 2rem;
  color: ${(props) => (props.color ? props.color : "#000000")};
  background-color: ${(props) => (props.bg ? props.bg : "none")};
  transition: 0.3s all ease-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

export default function Button({ bg, color, children, onClick }) {
  return (
    <BtnCss bg={bg} color={color} onClick={onClick}>
      {children}
    </BtnCss>
  );
}
