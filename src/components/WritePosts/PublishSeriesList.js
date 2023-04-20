import React from "react";
import { useEffect } from "react";

import styled from "styled-components";

const SeriesList = styled.div`
  width: 100%;
  height: 24rem;
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

export default function PublishSeriesList({ list, selectedId, onSelectedId }) {
  useEffect(() => {
    onSelectedId(list[0]._id);
  }, [list, onSelectedId]);
  return (
    <SeriesList>
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
