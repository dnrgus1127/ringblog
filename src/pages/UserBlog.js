import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import BlogNavigation from "../components/UserBlog/BlogNavigation";
import PageBySeries from "../components/UserBlog/PageBySeries";
import PostCardList from "../components/UserBlog/PostCardList";
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

  // writer 기반으로 수정 필요
  const RouteContents = (type) => {
    switch (type) {
      case 0:
        return <PostCardList writer={writer} uri={"/posts/writer"} />;
      case 1:
        return <PostCardList writer={writer} uri={"/popularPosts"} />;
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
