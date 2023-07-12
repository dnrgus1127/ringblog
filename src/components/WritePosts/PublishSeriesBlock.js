import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { writeActions } from "../../redux/writeReducer";
import { Button } from "../common/button/Button";

const SeriesSelect = styled(Button)`
  width: 100%;
  color: ${({ theme }) => theme.btnColor};
  background-color: ${({ theme }) => theme.bgElement2};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
`;

const SelectedSeries = styled.div`
  .seriesName {
    padding: 1rem 2rem;
    font-size: 1.6rem;
    font-weight: 800;
    background-color: ${({ theme }) => theme.bgElement3};
    color: ${({ theme }) => theme.btnColor};
    cursor: pointer;
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

  const onSelectSeries = () => {
    dispatch(writeActions.onToggleSeriesSelect());
  };
  return (
    <div>
      {selectedSeries.id ? (
        <SelectedSeries>
          <div className='seriesName' onClick={onSelectSeries}>
            {selectedSeries.title}
          </div>
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
