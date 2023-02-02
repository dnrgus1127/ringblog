import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { useQuery } from "../functions/urlQuery";
import PostContents from "../components/PostContents";
import { getPostByIndex } from "../functions/fetch";

const Body = styled.div`
  padding-top: calc(var(--header) * 1.5);
`;

export default function PostPage({ theme, toggleTheme }) {
  let query = useQuery();
  const index = query.get("index");
  const [post, setPost] = useState({});
  useEffect(() => {
    getPostByIndex(index).then(setPost);
  }, [index]);

  return (
    <React.Fragment>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Body>
        <PostContents post={post} />
      </Body>
    </React.Fragment>
  );
}
