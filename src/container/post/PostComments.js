import React from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import ComponentLoading from "../../components/common/ComponentLoading";
import PostWriteCommentContainer from "./PostWriteCommentContainer";
import PostCommentNoLogin from "../../components/posts/PostCommentNoLogin";
import PostCommentList from "../../components/posts/comments/PostCommentList";

const PostCommentsBlock = styled.div``;

export default function PostComments({ index }) {
  const { loggedIn } = useSelector((state) => state.login);

  const { data, isLoading, refetch } = useQuery(
    ["comments", index],
    async () => {
      const response = await fetch(`/comments?postId=${index}`);
      return response.json();
    }
  );

  if (isLoading) return <ComponentLoading text='댓글' />;
  return (
    <PostCommentsBlock>
      {loggedIn ? (
        <PostWriteCommentContainer refetchComments={refetch} index={index} />
      ) : (
        <PostCommentNoLogin />
      )}
      <PostCommentList data={data} update={refetch} />
    </PostCommentsBlock>
  );
}
