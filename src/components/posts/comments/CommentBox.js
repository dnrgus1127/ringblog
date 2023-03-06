import React from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { commentValid } from "../../../functions/comments/commentValidation";
import { Context } from "../../../functions/Login/LoginProvider";
import { FullStamp } from "../../../functions/time";
import { ColorButton } from "../../Button";
import { Fetch } from "../../Fetch";
import LoginForm from "../../common/Login/LoginForm";
import CommentList from "./CommentList";
import CommentTA from "./CommentTA";

const Container = styled.div`
  .loginUser {
    font-size: 1.4rem;
    cursor: pointer;
    border-bottom: 1px solid ${({ theme }) => theme.btnColor};
    display: inline-block;
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
  const { loggedUser, loggedIn, setLoggedIn } = useContext(Context);
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
        if (data.type === 100) {
          setLoggedIn(false);
          alert("다시 로그인해 주세요");
          return;
        }
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
    <React.Fragment>
      <p className='loginUser'>{loggedUser.username}</p>
      <WriteComment onSubmit={submit}>
        <CommentTA
          placeholder='댓글을 작성하세요'
          onChange={(e) => {
            if (commentValid(e.target.value)) {
              setComments(e.target.value);
            } else {
              alert("!@#$%^&*를 제외한 특수문자를 입력할 수 없습니다.");
            }
          }}
          value={comments}
          name='comments'
          id='comments'
        ></CommentTA>
        <Button type='submit'>작성하기</Button>
      </WriteComment>
    </React.Fragment>
  );

  function loadComments({ data }) {
    return <CommentList data={data} update={forceUpdate} />;
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
