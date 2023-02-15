import React from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Context } from "../../../functions/Login/LoginProvider";
import { FullStamp } from "../../../functions/time";
import { ColorButton } from "../../Button";
import { Fetch } from "../../Fetch";
import LoginForm from "../../Login/LoginForm";
import CommentItem from "./CommentItem";

const Container = styled.div`
  /* border: 1px solid ${({ theme }) => theme.tmp}; */
  textarea {
    background-color: ${({ theme }) => theme.bgElement};
    border: 0.1px solid rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    padding: 1rem 2rem;
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
`;

const WarningBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.bgElement3};
  border: 0.5px solid ${({ theme }) => theme.btnColor};
  border-radius: 4px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const WriteComment = styled.form`
  text-align: end;
`;

const Button = styled(ColorButton)`
  font-size: 1.6rem;
  margin: 0;
`;

const LoginFormWrap = styled.div`
  position: fixed;
  left: 0;
  top: 0;
`;

const LoginButton = styled(ColorButton)`
  margin: 0;
  font-size: 1.2rem;
`;

export default function CommentBox({ index }) {
  const [comments, setComments] = useState("");
  const { loggedUser, loggedIn } = useContext(Context);
  const [update, setUpdate] = useState();
  const [onOffLogin, setLogin] = useState();
  const forceUpdate = useCallback(() => setUpdate({}), []);

  const submit = (e) => {
    e.preventDefault();

    // 댓글 작성
    fetch("/comments", {
      method: "POST",
      body: JSON.stringify({
        comments: comments,
        userId: loggedUser.userId,
        createTime: FullStamp(),
        postId: index,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setComments("");
          forceUpdate();
          alert("댓글을 작성했습니다.");
        } else {
          alert("댓글 작성 실패");
        }
      });
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

  function loadComments({ data }) {
    return (
      <div>
        <p>{data.length}개의 댓글</p>
        {data.map((item, idx) => (
          <CommentItem key={idx} commentsUpdate={forceUpdate}>
            {item}
          </CommentItem>
        ))}
      </div>
    );
  }

  return (
    <Container>
      {loggedIn ? (
        NewComments
      ) : (
        <WarningBox>
          <p>댓글을 작성하려면 로그인이 필요합니다.</p>
          <LoginButton onClick={() => setLogin(true)}>로그인</LoginButton>
        </WarningBox>
      )}
      {onOffLogin ? (
        <LoginFormWrap>
          <LoginForm onOff={() => setLogin(false)} />
        </LoginFormWrap>
      ) : null}
      <Fetch
        uri={`/comments?postId=${index}`}
        options={update}
        renderSuccess={loadComments}
      ></Fetch>
    </Container>
  );
}
