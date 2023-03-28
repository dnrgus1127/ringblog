import React from "react";
import { useContext } from "react";
import { Context } from "../../functions/Login/LoginProvider";
import { useFetch } from "../../Hooks/useFetch";
import styled from "styled-components";
import { useMutation } from "react-query";

const SeriesList = styled.div`
  width: 100%;
  height: 24rem;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.bgElement3};
  .selected {
    color: ${({ theme }) => theme.color};
    background-color: ${({ theme }) => theme.bgElement};
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
