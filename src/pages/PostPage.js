import React from "react";
import Header from "../components/Header/Header";
import styled from "styled-components";
import { useQuery as uriQuery } from "../functions/urlQuery";
import PostContents from "../components/posts/PostContents";
import Loading from "../components/Loading";
import { domain } from "../lib/fetch/domain";
import { useQuery } from "react-query";

const Body = styled.div`
  padding: calc(var(--header) * 1.5) 0;

  width: calc(var(--width) * 0.65);
  margin: 0 auto;

  @media (max-width: 640px) {
    width: 90vw;
  }
`;

export default function PostPage({ theme, toggleTheme }) {
  let query = uriQuery();
  const index = query.get("index");
  const useQueryUri = `${domain}/posts/${index}`;

  const { isLoading, data } = useQuery(
    ["postQuery", index],
    async () => {
      const response = await fetch(useQueryUri);
      return response.json();
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  function RenderPost() {
    if (isLoading) return <Loading text='포스트 열어보는 중' />;
    if (data) return <PostContents post={data} index={index} />;
  }

  return (
    <React.Fragment>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Body>
        <RenderPost />
      </Body>
    </React.Fragment>
  );
}
