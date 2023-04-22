import React from "react";
import styled from "styled-components";
import HasTagItem from "./HasTagItem";

const TagBlock = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > div {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
`;

export default function HashTagBlock({ hashTags }) {
  return (
    <TagBlock>
      {hashTags.map((item, idx) => (
        <HasTagItem key={idx} hashTag={item} />
      ))}
    </TagBlock>
  );
}
