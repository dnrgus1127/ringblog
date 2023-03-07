import React from "react";
import styled from "styled-components";
import useBoolean from "../../Hooks/useBoolean";
import SeriesPosts from "./SeriesPosts";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgElement3};
  padding: 2rem 2.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  .title {
    font-size: 2rem;
    color: ${({ theme }) => theme.btnColor};
    font-weight: 600;
  }
  .showBtn {
    color: ${({ theme }) => theme.greyColor};
  }
`;

export default function SeriesItem({ children }) {
  const [showList, onToggleShowList] = useBoolean(false);
  return (
    <Container>
      <p className='title'>{children.title}</p>
      <button className='showBtn' onClick={onToggleShowList}>
        {showList ? "▼" : "▲"} 글 보기
      </button>
      {showList ? <SeriesPosts seriesId={children._id} /> : null}
    </Container>
  );
}
