import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { BtnCss, ColorButton } from "../../components/Button";
import { writeActions } from "../../redux/writeReducer";

const Button = styled(BtnCss)``;

const SeriesButton = styled(ColorButton)`
  color: ${({ theme }) => theme.oppositeColor};
  background-color: ${({ theme }) => theme.btnColor};
`;

export default function PublishSetting() {
  const dispatch = useDispatch();
  return (
    <div>
      <SeriesButton
        onClick={() => {
          dispatch(writeActions.onToggleSeriesSelect());
        }}
      >
        시리즈 선택하기
      </SeriesButton>
    </div>
  );
}
