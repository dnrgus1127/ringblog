import React from "react";
import styled from "styled-components";

const UnderBar = styled.button`
  padding: 1rem 2rem;
  font-weight: 800;
  font-size: 1.6rem;
  color: ${({ theme }) =>
    (props) =>
      props.selected && theme.btnColor};
`;

export default function UnderBarBtn({ onClick, children, selected }) {
  return (
    <UnderBar selected={selected} onClick={onClick}>
      {children}
    </UnderBar>
  );
}
