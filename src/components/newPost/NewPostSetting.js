import React from "react";
import styled from "styled-components";
import useBoolean from "../../Hooks/useBoolean";
import { useFetch } from "../../Hooks/useFetch";
import NewPostSeries from "./NewPostSeries.js";

const Container = styled.div``;

const SeriesWrap = styled.div`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.bgElement3};
  padding: 1rem 2rem;
  text-align: center;

  .addButton {
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.btnColor};
    cursor: pointer;
  }
`;

export default function NewPostSetting() {
  const [onSeries, onToggelSeries] = useBoolean(false);

  const { data } = useFetch(`/series/byUser?userId=root`);
  return (
    <Container>
      <SeriesWrap>
        {onSeries ? (
          <NewPostSeries data={data} cancel={onToggelSeries} />
        ) : (
          <button className='addButton' onClick={onToggelSeries}>
            시리즈에 추가하기
          </button>
        )}
      </SeriesWrap>
    </Container>
  );
}
