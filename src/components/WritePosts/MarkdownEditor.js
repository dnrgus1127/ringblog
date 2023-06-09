// ? "TextArea" for markdown input
// ? 마크다운 입력을 위한 TextArea 영역
import React from "react";
import styled from "styled-components";
import media from "../../lib/style/media";

const MarkdownInputBlock = styled.textarea`
  background: none;
  outline: none;
  border: none;
  font-family: inherit;
  font-size: 1.8rem;
  width: 100%;
  height: 67vh;
  resize: none;

  &::-webkit-scrollbar {
    width: 3px;
    height: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color};
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.bgElement};
  }

  ${media.xlarge} {
    & {
      height: 70vh;
    }
  }

  ${media.medium} {
    & {
      height: 77vh;
      padding: 0 calc(var(--gap) / 3);
      font-size: 1.6rem;
    }
  }
`;

/**
 * 마크다운을 입력받는 컴포넌트
 * @props data,onChange
 * @return textArea HTMLTag
 */
export default function MarkdownEditor({
  data,
  onChange,
  onBlur,
  refPorps: markDownEditorRef,
  onPaste,
  onDrop,
  onKeyDown,
}) {
  return (
    <MarkdownInputBlock
      ref={markDownEditorRef}
      onChange={onChange}
      onPaste={onPaste}
      onKeyDown={onKeyDown}
      value={data}
      onBlur={onBlur}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={onDrop}
    />
  );
}
