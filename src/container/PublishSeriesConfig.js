import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { BtnCss } from "../components/Button";
import { writeActions } from "../redux/writeReducer";

const Button = styled(BtnCss)``;

const CancelButton = styled(Button)``;

export default function PublishSeriesConfig() {
  const dispatch = useDispatch();
  return (
    <div>
      <CancelButton
        onClick={() => dispatch(writeActions.onToggleSeriesSelect())}
      >
        취소
      </CancelButton>
    </div>
  );
}
