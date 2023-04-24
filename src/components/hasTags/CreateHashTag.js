import React from "react";
import styled from "styled-components";

const HashTagBlock = styled.div`
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.bgElement2};
`;
const HashTagInput = styled.input`
  width: 100%;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.bgElement3};
  border-radius: 4px;
  padding: 0 1rem;
`;

export default function CreateHashTag({ onEnter }) {
  return (
    <HashTagBlock>
      <HashTagInput
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnter(e.target.value);
            e.target.value = "";
          }
        }}
      />
    </HashTagBlock>
  );
}
