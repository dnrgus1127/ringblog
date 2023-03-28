import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { writeActions } from "../../redux/writeReducer";
import { BtnCss } from "../Button";

const SeriesSelect = styled(BtnCss)`
  width: 100%;
  color: ${({ theme }) => theme.warning};
  background-color: ${({ theme }) => theme.bgElement3};
`;

const SelectedSeries = styled.div`
  .seriesName {
    padding: 1rem 2rem;
    font-size: 1.6rem;
    font-weight: 800;
    background-color: ${({ theme }) => theme.bgElement3};
    color: ${({ theme }) => theme.btnColor};
  }
  .delWrap {
    text-align: end;

    button {
      color: rgb(222, 82, 82);
    }

    button:hover {
      color: rgb(255, 82, 82);
      text-decoration: underline;
    }
  }
`;

export default function PublishSeriesBlock() {
  const dispatch = useDispatch();
  const { selectedSeries } = useSelector((state) => state.write);

  const deleteSeries = () => {
    dispatch(writeActions.delSelectedSeries());
  };
  return (
    <div>
      {" "}
      {selectedSeries ? (
        <SelectedSeries>
          <div className='seriesName'>{selectedSeries.title}</div>
          <div className='delWrap'>
            <button className='delBtn' onClick={deleteSeries}>
              시리즈에서 제거하기
            </button>
          </div>
        </SelectedSeries>
      ) : (
        <SeriesSelect
          onClick={() => {
            dispatch(writeActions.onToggleSeriesSelect());
          }}
        >
          시리즈 선택하기
        </SeriesSelect>
      )}
    </div>
  );
}
