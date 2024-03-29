import React from "react";
import styled from "styled-components";
import { ConfirmButton } from "../common/button/Button";
import CommentTA from "./comments/CommentTA";

const PostCommentWriteBlock = styled.div`
  form {
    text-align: end;
  }
  .loginUser {
    font-size: 1.4rem;
    cursor: pointer;
    border-bottom: 1px solid ${({ theme }) => theme.btnColor};
    display: inline-block;
    margin-bottom: 1rem;
  }
`;

export default function PostCommentWrite({
  onChange,
  onWrite,
  comment,
  loggedUsername,
}) {
  return (
    <PostCommentWriteBlock>
      <p className='loginUser'>{loggedUsername}</p>
      <form onSubmit={onWrite}>
        <CommentTA
          placeholder='댓글을 작성하세요'
          onChange={onChange}
          value={comment}
          name='comments'
          id='comments'
        ></CommentTA>
        <ConfirmButton type='submit'>작성하기</ConfirmButton>
      </form>
    </PostCommentWriteBlock>
  );
}
