import React from "react";
import styled from "styled-components";
import EditorToolBoxBtn from "./EditorToolBoxBtn";

const ToolBoxBlock = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  hr {
    height: 2rem;
    border: none;
    width: 1px;
    background-color: ${({ theme }) => theme.greyColor};
  }
`;

export default function EditorToolBox({ onHeading, onBold }) {
  const headings = ["# ", "## ", "### ", "#### "];

  return (
    <ToolBoxBlock>
      {headings.map((item, idx) => (
        <EditorToolBoxBtn
          icon={`h${idx + 1}`}
          type='heading'
          onClick={() => {
            onHeading(item, item.length);
          }}
        />
      ))}
      <hr />
      <EditorToolBoxBtn icon='B' type='bold' onClick={onBold} />
      {/* <EditorToolBoxBtn icon='I' type='italic' onClick={onClickItalic} />
      <EditorToolBoxBtn icon='T' type='cancel' onClick={onClickCancel} /> */}
      <hr />
      <EditorToolBoxBtn icon='💻' />
      <EditorToolBoxBtn icon='📷' />
      <EditorToolBoxBtn icon='🔗' />
      <EditorToolBoxBtn icon='💬' />
    </ToolBoxBlock>
  );
}
