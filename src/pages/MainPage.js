import React from "react";
import styled from "styled-components";
import BlogList from "../components/BlogList";
import Header from "../components/Header";

const Body = styled.div`
  /* padding: 0 var(--gap); */
  padding-top: calc(var(--header) * 1.5);
  background-color: ${({ theme }) => theme.bgColor};
`;

const Footer = styled.footer`
  height: 15vh;
  width: 100%;
  padding: 0 var(--gap);
  background-color: ${({ theme }) => theme.bgColor};
`;

export default function MainPage({ toggleTheme, theme }) {
  return (
    <React.Fragment>
      <Header toggleTheme={toggleTheme} theme={theme} />
      <Body>
        <BlogList />
      </Body>
      <Footer></Footer>
    </React.Fragment>
  );
}
