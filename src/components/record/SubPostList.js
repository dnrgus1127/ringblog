import React from "react";
import SubPostItem from "./SubPostItem";

import styled from "styled-components";

const PostList = styled.div`
  display: flex;
  width: 100vw;
  padding: 2rem 0;
  align-items: center;

  & > button {
    background-color: ${({ theme }) => theme.btnColor};
    color: ${({ theme }) => theme.oppositeColor};
    font-size: 1.4rem;
    font-weight: 800;
    border-radius: 4px;
    margin-right: 2rem;
    height: 9rem;
    padding: 0 0.5rem;
  }
`;

export default function SubPostList({ data, nextPage, prevPage }) {
  return (
    <>
      <p>{data.count}개의 포스트</p>
      <PostList>
        {data.nextPage !== 1 && <button onClick={prevPage}>prev</button>}
        {data.data.map((item, idx) => (
          <SubPostItem key={idx} data={item}></SubPostItem>
        ))}
        <button onClick={nextPage}>More</button>
      </PostList>
    </>
  );
}
