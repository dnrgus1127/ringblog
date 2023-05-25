import React from "react";
import styled from "styled-components";
import media from "../../lib/style/media";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  font-family: "Noto Sans KR", sans-serif;
  overflow: hidden;
  position: relative;
`;

const WriteSection = styled.div`
  width: 50%;
  height: 100vh;
  ${media.medium} {
    width: 100%;
  }
`;

const Left = styled(WriteSection)`
  background-color: ${({ theme }) => theme.bgElement};
`;
const Right = styled(WriteSection)`
  background-color: ${({ theme }) => theme.mdColor};
  overflow: scroll;
  overflow-x: hidden;
  padding: calc(var(--gap) / 2);
  &::-webkit-scrollbar {
    width: 3px;
    height: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color};
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.oppositeColor};
  }
  ${media.medium} {
    display: none;
  }
`;

export default function WriteTemplate({ left, right, children }) {
  return (
    <Container>
      <Left>{left}</Left>
      <Right>{right}</Right>
      {children}
    </Container>
  );
}
