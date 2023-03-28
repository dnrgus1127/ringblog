import React from "react";
import styled from "styled-components";
import { BtnCss, ColorButton } from "../Button";

const ConfigBtns = styled.div`
  text-align: end;
  button {
    padding: 0.8rem 1.4rem;
    font-size: 1.4rem;
  }
`;

const CancelBtn = styled(BtnCss)``;
const ConfirmBtn = styled(ColorButton)`
  &:disabled {
    background-color: ${({ theme }) => theme.bgElement3};
    color: ${({ theme }) => theme.greyColor};
    cursor: not-allowed;
  }
`;

export default function PublishSeriesConfigBtn({
  onConfirm,
  onCancel,
  disableConfirm,
}) {
  return (
    <ConfigBtns>
      <CancelBtn onClick={onCancel}>취소</CancelBtn>
      <ConfirmBtn onClick={onConfirm} disabled={disableConfirm}>
        선택하기
      </ConfirmBtn>
    </ConfigBtns>
  );
}
