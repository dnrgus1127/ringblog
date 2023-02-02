import React from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { useQuery } from "../functions/urlQuery";
import PostContents from "../components/PostContents";
import { Fetch } from "../components/Fetch";

const Body = styled.div`
  padding-top: calc(var(--header) * 1.5);
  width: calc(var(--width) * 0.65);
  margin: 0 auto;
`;

export default function PostPage({ theme, toggleTheme }) {
  let query = useQuery();
  const index = query.get("index");
  const uri = `/posts/${index}`;

  return (
    <React.Fragment>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Body>
        <Fetch uri={uri} renderSucsecc={fetchSucces}></Fetch>
      </Body>
    </React.Fragment>
  );
}

function fetchSucces({ data }) {
  return <PostContents post={data} />;
}
