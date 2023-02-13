import React from "react";
import { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Context } from "../../../functions/Login/LoginProvider";
import { ColorButton } from "../../Button";
import { Fetch } from "../../Fetch";
import CommentItem from "./CommentItem";

const Container = styled.div`
  /* border: 1px solid ${({ theme }) => theme.tmp}; */
`;

const WriteComment = styled.form`
  text-align: end;
  textarea {
    background-color: ${({ theme }) => theme.bgElement};
    border: 0.1px solid rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    padding: 1rem 2rem;
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
`;
const Button = styled(ColorButton)`
  font-size: 1.6rem;
  margin: 0;
`;

export default function CommentBox({ index }) {
  const [comments, setComments] = useState("");
  const { loggedUser, loggedIn } = useContext(Context);

  const submit = (e) => {
    e.preventDefault();

    fetch("/comments", {
      method: "POST",
      body: JSON.stringify({
        comments: comments,
        userId: loggedUser.userId,
        postId: index,
      }),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      setComments("");
    });
    alert("댓글을 작성했습니다.");
  };

  const NewComments = (
    <WriteComment onSubmit={submit}>
      <textarea
        placeholder='댓글을 작성하세요'
        onChange={(e) => {
          setComments(e.target.value);
        }}
        value={comments}
        name='comments'
        id='comments'
      ></textarea>
      <Button type='submit'>작성하기</Button>
    </WriteComment>
  );

  return (
    <Container>
      {loggedIn ? (
        NewComments
      ) : (
        <div>댓글을 작성하려면 로그인이 필요합니다.</div>
      )}
      <Fetch
        uri={`/comments?postId=${index}`}
        renderSuccess={loadComments}
      ></Fetch>
    </Container>
  );
}

function loadComments({ data }) {
  return (
    <div>
      <p>{data.length}개의 댓글</p>
      {data.map((item, idx) => (
        <CommentItem key={idx}>{item}</CommentItem>
      ))}
    </div>
  );
}
