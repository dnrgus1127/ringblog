import React from "react";
import styled from "styled-components";
import { ConfirmButton, CancelButton } from "../common/button/Button";

const ConfigBtns = styled.div`
  text-align: end;
  button {
    padding: 0.8rem 1.4rem;
    font-size: 1.4rem;
  }
`;

export default function PublishSeriesConfigBtn({
  onConfirm,
  onCancel,
  disableConfirm,
}) {
  return (
    <ConfigBtns>
      <CancelButton onClick={onCancel}>취소</CancelButton>
      <ConfirmButton onClick={onConfirm} disabled={disableConfirm}>
        선택하기
      </ConfirmButton>
    </ConfigBtns>
  );
}
