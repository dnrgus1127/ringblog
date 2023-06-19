import React from "react";
import styled from "styled-components";
import shadow from "../../../../lib/style/shadow";

const SocialLoginButton = styled.button`
  font-size: 0;
  line-height: 0;
  padding: 0.8rem;
  border-radius: 6px;
  ${shadow.small};

  background-color: ${(props) => `${props.bgColor}`};
  svg {
    width: 3rem;
    height: 3rem;
  }
`;

export default function SocialLoginBtn({ onClick, bgColor, children }) {
  return (
    <SocialLoginButton bgColor={bgColor} onClick={onClick}>
      {children}
    </SocialLoginButton>
  );
}
