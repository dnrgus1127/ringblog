import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { writeActions } from "../../redux/writeReducer";
import { CancelButton, ConfirmButton } from "../common/Button";

const ButtonWrapper = styled.div`
  text-align: end;
`;

export default function PublishButtons() {
  const dispatch = useDispatch();

  const onCancel = () => {
    dispatch(writeActions.onToggleVisible());
  };
  return (
    <ButtonWrapper>
      <CancelButton onClick={onCancel}>취소</CancelButton>
      <ConfirmButton>글 쓰기</ConfirmButton>
    </ButtonWrapper>
  );
}
