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

  &:hover {
    color: ${({ theme }) => theme.btnColor};
    font-weight: 800;
  }
`;

export default function HashTagByPreview({ data }) {
  return (
    <HashTagBlock>
      {data.map(
        (item, idx) =>
          idx < 4 && (
            <HashTagItem
              key={idx}
              onClick={() => {
                con;
              }}
            >
              # {item}
            </HashTagItem>
          )
      )}
    </HashTagBlock>
  );
}
