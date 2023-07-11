import React from "react";
import styled from "styled-components";
import { MarkdownCss } from "../common/markdown/MarkdownCss";
import CustomMD from "../common/markdown/CustomMD";

const UpdateNoteItemBlock = styled.div`
  .releaseVersion {
    padding: 1rem;
    border: 1px solid ${({ theme }) => theme.pointColor};
  }
`;

const ReleaseNote = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.pointColor};
`;

export default function UpdateNoteItem({ data }) {
  return (
    <UpdateNoteItemBlock>
      <h1 className='releaseVersion'>릴리즈 노트 {data.version}</h1>
      <ReleaseNote>
        <CustomMD>{data.note}</CustomMD>
      </ReleaseNote>
    </UpdateNoteItemBlock>
  );
}
