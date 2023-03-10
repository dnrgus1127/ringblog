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

    // λκΈ μμ±
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
          alert("λ€μ λ‘κ·ΈμΈν΄ μ£ΌμΈμ");
          return;
        }
        if (data.success) {
          setComments("");
          forceUpdate();
          alert("λκΈμ μμ±νμ΅λλ€.");
        } else {
          alert("λκΈ μμ± μ€ν¨");
        }
      });
  };

  const NewComments = (
    <React.Fragment>
      <p className='loginUser'>{loggedUser.username}</p>
      <WriteComment onSubmit={submit}>
        <CommentTA
          placeholder='λκΈμ μμ±νμΈμ'
          onChange={(e) => {
            if (commentValid(e.target.value)) {
              setComments(e.target.value);
            } else {
              alert("!@#$%^&*λ₯Ό μ μΈν νΉμλ¬Έμλ₯Ό μλ ₯ν  μ μμ΅λλ€.");
            }
          }}
          value={comments}
          name='comments'
          id='comments'
        ></CommentTA>
        <Button type='submit'>μμ±νκΈ°</Button>
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
          <p>λκΈμ μμ±νλ €λ©΄ λ‘κ·ΈμΈμ΄ νμν©λλ€.</p>
          <LoginButton onClick={() => setLogin(true)}>λ‘κ·ΈμΈ</LoginButton>
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
