import React from "react";
import styled from "styled-components";
import Header from "../../components/Header/Header";
import PostListContainer from "./PostListContainer";

const Body = styled.div`
  padding-top: calc(var(--header) * 1.5);
  background-color: ${({ theme }) => theme.bgColor};
`;

const Footer = styled.footer`
  height: 15vh;
  width: 100%;
  padding: 0 var(--gap);
  background-color: ${({ theme }) => theme.bgColor};
`;

export default function MainPage() {
  return (
    <React.Fragment>
      <Header />
      <Body>
        <PostListContainer />
      </Body>
      <Footer></Footer>
    </React.Fragment>
  );
}
