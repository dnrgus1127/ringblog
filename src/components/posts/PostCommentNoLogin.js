import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loginActions } from "../../redux/loginState";
import { ConfirmButton } from "../common/button/Button";

const PostCommentNoLoginBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.bgElement3};
  border: 0.5px solid ${({ theme }) => theme.btnColor};
  border-radius: 4px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

export default function PostCommentNoLogin() {
  const dispatch = useDispatch();
  return (
    <PostCommentNoLoginBlock>
      <p>댓글을 작성하려면 로그인이 필요합니다.</p>
      <ConfirmButton onClick={() => dispatch(loginActions.onToggleLoginForm())}>
        로그인
      </ConfirmButton>
    </PostCommentNoLoginBlock>
  );
}
