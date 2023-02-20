import React from "react";
import Header from "../components/Header/Header";
import styled from "styled-components";
import { useQuery } from "../functions/urlQuery";
import PostContents from "../components/posts/PostContents";
import { Fetch } from "../components/Fetch";

const Body = styled.div`
  padding: calc(var(--header) * 1.5) 0;

  width: calc(var(--width) * 0.65);
  margin: 0 auto;

  @media (max-width: 640px) {
    width: 90vw;
  }
`;

export default function PostPage({ theme, toggleTheme }) {
  let query = useQuery();
  const index = query.get("index");
  const uri = `/posts/${index}`;

  function fetchSucces({ data }) {
    return <PostContents post={data} index={index} />;
  }

  return (
    <React.Fragment>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Body>
        <div>
          <Fetch uri={uri} renderSuccess={fetchSucces}></Fetch>
        </div>
      </Body>
    </React.Fragment>
  );
}
