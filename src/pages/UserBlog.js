import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import AllPostsOfUser from "../components/UserBlog/AllPostsOfUser";
import BlogNavigation from "../components/UserBlog/BlogNavigation";
import PageBySeries from "../components/UserBlog/PageBySeries";
import { useQuery } from "../functions/urlQuery";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const BlogContents = styled.div`
  width: var(--width);
  background-color: ${({ theme }) => theme.bgColor};
  margin-top: calc(var(--header) * 1.5);

  hr {
    border: 0;
    background-color: ${({ theme }) => theme.greyColor};
    box-shadow: 0px 0px 5px ${({ theme }) => theme.greyColor};
    height: 1px;
  }

  h1 {
    margin-bottom: 2rem;
  }
`;

export default function UserBlog({ theme, toggleTheme }) {
  const [navType, setNavType] = useState(0);

  let query = useQuery();
  const writer = query.get("writer");

  const RouteContents = (type) => {
    switch (type) {
      case 0:
        return <AllPostsOfUser writer={writer} />;
      case 1:
        return <div>2</div>;
      case 2:
        return <PageBySeries>3</PageBySeries>;
      default:
        return <div>error</div>;
    }
  };
  return (
    <Container>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <BlogContents>
        <h1>정욱현's Ring</h1>
        <BlogNavigation navType={navType} setNavType={setNavType} />
        {RouteContents(navType)}
      </BlogContents>
    </Container>
  );
}
