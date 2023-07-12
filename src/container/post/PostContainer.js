import React from "react";
import Header from "../../components/Header/Header";
import styled from "styled-components";
import { useQuery as uriQuery } from "../../functions/urlQuery";
import Loading from "../../components/common/Loading";
import { useQuery } from "react-query";
import useQueryUri from "../../Hooks/useQueryUri";
import { useDispatch } from "react-redux";
import { postActions } from "../../redux/postState";
import { useEffect } from "react";
import media from "../../lib/style/media";
import PostViewer from "./PostViewer";

const Body = styled.div`
  padding: calc(var(--header) * 1.5) 0;

  width: calc(var(--width) * 0.65);
  margin: 0 auto;

  ${media.medium} {
    width: var(--width);
  }

  @media (max-width: 640px) {
    width: 90vw;
  }
`;

export default function PostContainer() {
  let query = uriQuery();
  const index = query.get("index");
  const queryUri = `/posts/${index}`;
  const dispatch = useDispatch();

  const { isLoading, data } = useQuery(
    ["postQuery", index],
    async () => {
      const response = await fetch(queryUri);
      return response.json();
    },
    {
      staleTime: 600000,
      refetchOnWindowFocus: false,
    }
  );

  const { data: hashTags, isLoading: hashTagLoading } = useQueryUri(
    ["hashTags", index],
    `/write/hashTags?postId=${index}`,
    0,
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (!hashTagLoading) {
      dispatch(postActions.setHashTags(hashTags));
    }
  }, [hashTagLoading, hashTags, dispatch]);

  if (isLoading) return <Loading text='포스트 열어보는 중' />;
  return (
    <React.Fragment>
      <Header />
      <Body>
        <PostViewer post={data} index={index} />
      </Body>
    </React.Fragment>
  );
}
