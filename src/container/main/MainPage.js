import React from "react";
import styled from "styled-components";
import BlogList from "../../components/mainPage/BlogList";
import Header from "../../components/Header/Header";

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
        <BlogList />
      </Body>
      <Footer></Footer>
    </React.Fragment>
  );
}
