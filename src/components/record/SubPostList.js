import React from "react";
import SubPostItem from "./SubPostItem";

import styled from "styled-components";

const PostList = styled.div`
  display: flex;
  width: 90vw;
  padding: 2rem 0;
  overflow-x: auto;
`;

export default function SubPostList({ data, cnt }) {
  return (
    <>
      <p>{cnt}개의 포스트</p>
      <PostList>
        {data.map((item, idx) => (
          <SubPostItem key={idx} data={item} cnt={cnt}></SubPostItem>
        ))}
      </PostList>
    </>
  );
}
