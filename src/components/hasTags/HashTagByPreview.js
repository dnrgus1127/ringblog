import React from "react";
import styled from "styled-components";

const HashTagBlock = styled.div`
  display: flex;
  height: 1.8rem;
  overflow: hidden;
  flex-wrap: wrap;
`;

const HashTagItem = styled.p`
  padding: 0 0.2rem;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.greyColor};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.btnColor};
    font-weight: 800;
  }
`;

export default function HashTagByPreview({ data, limit = 4 }) {
  if (data.length === 0) return;
  return (
    <HashTagBlock className='hashTag'>
      {data.map(
        (item, idx) =>
          idx < limit && <HashTagItem key={idx}># {item}</HashTagItem>
      )}
    </HashTagBlock>
  );
}
