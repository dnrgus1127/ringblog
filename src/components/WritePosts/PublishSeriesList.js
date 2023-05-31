import React from "react";
import { useEffect } from "react";

import styled from "styled-components";

const SeriesList = styled.div`
  width: 100%;
  max-height: 24rem;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.bgElement2};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  .selected {
    font-weight: 800;
    color: ${({ theme }) =>
      theme.color === "black" ? theme.btnColor : theme.color};
    background-color: ${({ theme }) => theme.bgElement3};
  }
`;
const SeriesItem = styled.div`
  text-align: start;
  padding: 1rem 2rem;
  color: ${({ theme }) => theme.greyColor};
  border-bottom: 1px solid ${({ theme }) => theme.greyColor};
  cursor: pointer;
`;

const EmptyList = styled(SeriesItem)`
  text-align: center;
  color: ${({ theme }) => theme.btnColor};
`;

export default function PublishSeriesList({ list, selectedId, onSelectedId }) {
  useEffect(() => {
    list.length !== 0 && onSelectedId(list[0]._id);
  }, [list, onSelectedId]);

  return (
    <SeriesList>
      {list.length === 0 && <EmptyList>시리즈를 추가해 보세요!</EmptyList>}
      {list.map((item) => (
        <SeriesItem
          key={item._id}
          className={selectedId === item._id ? "selected" : null}
          onClick={() => {
            onSelectedId(item._id);
          }}
        >
          {item.title}
        </SeriesItem>
      ))}
    </SeriesList>
  );
}
