import React from "react";
import styled from "styled-components";

import { CancelButton, ConfirmButton } from "../common/button/Button";

const ButtonWrapper = styled.div`
  text-align: end;
`;

export default function PublishButtons({ onCancel, onConfirm }) {
  return (
    <ButtonWrapper>
      <CancelButton onClick={onCancel}>취소</CancelButton>
      <ConfirmButton onClick={onConfirm}>글 쓰기</ConfirmButton>
    </ButtonWrapper>
  );
}
