import React from "react";
import styled from "styled-components";

const SocialLoginButton = styled.button`
  font-size: 0;
  line-height: 0;
  width: 190px;
`;

export default function SocialLoginBtn({ onClick, icon }) {
  return <SocialLoginButton onClick={onClick}>{icon}</SocialLoginButton>;
}
