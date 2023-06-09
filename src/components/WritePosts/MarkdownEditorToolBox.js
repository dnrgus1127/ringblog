import React, { useRef } from "react";
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

const headings = ["# ", "## ", "### ", "#### "];
export default function MarkdownEditorToolBox({
  onClickHeadingBtn,
  onClickFontStyleBtn,
  onClickImageBtn,
  onClickCodeBtn,
  onClickLinkBtn,
  onClickBlockQuoteBtn,
}) {
  const fileSelectorRef = useRef();
  return (
    <ToolBoxBlock>
      {headings.map((item, idx) => (
        <EditorToolBoxBtn
          icon={`h${idx + 1}`}
          type='heading'
          key={item}
          onClick={() => {
            onClickHeadingBtn(item, item.length);
          }}
        />
      ))}
      <hr />
      <EditorToolBoxBtn
        icon='B'
        type='bold'
        onClick={() => {
          onClickFontStyleBtn("**");
        }}
      />
      <EditorToolBoxBtn
        icon='I'
        type='italic'
        onClick={() => {
          onClickFontStyleBtn("_");
        }}
      />
      <EditorToolBoxBtn
        icon='T'
        type='cancel'
        onClick={() => {
          onClickFontStyleBtn("~~");
        }}
      />
      <hr />
      <EditorToolBoxBtn icon='💻' onClick={onClickCodeBtn} />

      <input
        type='file'
        hidden
        accept='image/*'
        ref={fileSelectorRef}
        onChange={(e) => {
          onClickImageBtn(e.target.files[0]);
        }}
      />
      <EditorToolBoxBtn
        icon='📷'
        onClick={() => {
          fileSelectorRef.current.click();
        }}
      />
      <EditorToolBoxBtn icon='🔗' onClick={onClickLinkBtn} />
      <EditorToolBoxBtn icon='💬' onClick={onClickBlockQuoteBtn} />
    </ToolBoxBlock>
  );
}
