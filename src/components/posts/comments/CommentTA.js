import React from "react";
import styled from "styled-components";

const Container = styled.textarea`
  background-color: ${({ theme }) => theme.bgElement};
  border: 0.1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  padding: 1.5rem 2.5rem;
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

export default function CommentTA(props) {
  return <Container {...props}></Container>;
}
