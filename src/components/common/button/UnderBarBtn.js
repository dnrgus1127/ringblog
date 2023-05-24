import React from "react";
import styled from "styled-components";
import media from "../../../lib/style/media";

const UnderBar = styled.button`
  padding: 1rem 2rem;
  font-weight: 800;
  font-size: 1.6rem;
  color: ${({ theme }) =>
    (props) =>
      props.selected && theme.btnColor};
  ${media.small} {
    width: 50%;
  }
`;

export default function UnderBarBtn({ onClick, children, selected }) {
  return (
    <UnderBar selected={selected} onClick={onClick}>
      {children}
    </UnderBar>
  );
}
