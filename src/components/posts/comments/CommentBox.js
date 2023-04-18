import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { commentValid } from "../../../functions/comments/commentValidation";
import { FullStamp } from "../../../functions/time";
import { ColorButton } from "../../Button";
import LoginForm from "../../common/Login/LoginForm";
import CommentList from "./CommentList";
import CommentTA from "./CommentTA";
import { useMutation, useQuery } from "react-query";
import ComponentLoading from "../../common/ComponentLoading";
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../../redux/postState";
import { loginActions } from "../../../redux/loginState";
import useAlert from "../../common/hooks/useAlert";

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
  const { loggedUser, loggedIn } = useSelector((state) => state.login);
  const { newComment } = useSelector((state) => state.post);
  const [onOffLogin, setLogin] = useState();
  const dispatch = useDispatch();
  const { onToggleAlert } = useAlert();

  // redux
  const logout = () => {
    dispatch(loginActions.setLogout());
  };
  const setNewcomment = (value) => {
    dispatch(postActions.setNewComment(value));
  };
  ///

  const submit = async (e) => {
    e.preventDefault();
    await writeComment();
    refetchComments();
  };

  const {
    data,
    isLoading,
    refetch: refetchComments,
  } = useQuery(["comments", index], async () => {
    const response = await fetch(`/comments?postId=${index}`);
    return response.json();
  });

  const { mutateAsync: writeComment } = useMutation(
    "writeComment",
    async () => {
      const response = await fetch(`/comments`, {
        method: "POST",
        body: JSON.stringify({
          comments: newComment,
          userId: loggedUser.userId,
          createTime: FullStamp(),
          postId: index,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.type === 100) {
        logout();
        onToggleAlert("다시 로그인해 주세요", true);
        return;
      }
      if (data.success) {
        setNewcomment("");
        onToggleAlert("댓글을 작성했습니다.");
      } else {
        onToggleAlert("댓글 작성 실패", true);
      }
    }
  );

  const NewComments = (
    <React.Fragment>
      <p className='loginUser'>{loggedUser.username}</p>
      <WriteComment onSubmit={submit}>
        <CommentTA
          placeholder='댓글을 작성하세요'
          onChange={(e) => {
            if (commentValid(e.target.value)) {
              setNewcomment(e.target.value);
            } else {
              onToggleAlert(
                "!@#$%^&*를 제외한 특수문자를 입력할 수 없습니다.",
                true
              );
            }
          }}
          value={newComment}
          name='comments'
          id='comments'
        ></CommentTA>
        <Button type='submit'>작성하기</Button>
      </WriteComment>
    </React.Fragment>
  );

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
      {isLoading && <ComponentLoading text='댓글' />}
      {data && <CommentList data={data} update={refetchComments} />}
    </Container>
  );
}
