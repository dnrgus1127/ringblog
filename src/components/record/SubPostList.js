import React from "react";
import SubPostItem from "./SubPostItem";

import styled from "styled-components";

const PostList = styled.div`
  display: flex;
  max-width: 80vw;
  overflow-x: auto;
`;

export default function SubPostList({ data }) {
  return (
    <PostList>
      {data.map((item, idx) => (
        <SubPostItem key={idx} data={item}></SubPostItem>
      ))}
    </PostList>
  );
}
