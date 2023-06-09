import React, { useEffect, useState } from "react";
import MarkdownEditor from "../../components/WritePosts/MarkdownEditor";
import { uploadImg } from "../../functions/fetch";
import MarkdownEditorToolBox from "../../components/WritePosts/MarkdownEditorToolBox";

export default function MarkdownEditorContainer({
  markDownEditorRef,
  editorValue,
  onChange,
}) {
  const [cursor, setCursor] = useState(0);
  const [endCursor, setEndCursor] = useState(0);

  // 특수문자 입력 후 커서 위치 조정하는 hook
  useEffect(() => {
    markDownEditorRef.current.setSelectionRange(cursor, endCursor);
    markDownEditorRef.current.focus();
  }, [cursor, endCursor, markDownEditorRef]);

  // ? toolkit functions ////////////////////////////////////
  const onClickHeadingBtn = (char, len) => {
    const { selectionStart, selectionEnd } = markDownEditorRef.current;

    if (selectionEnd !== selectionStart) {
      onChange(
        editorValue.substring(0, selectionStart) +
          char +
          editorValue.substring(selectionStart)
      );
      setCursor(selectionEnd + len);
      setEndCursor(selectionEnd + len);
    } else {
      onChange(
        editorValue.substring(0, selectionStart) +
          char +
          editorValue.substring(selectionEnd)
      );
      setCursor(selectionStart + len);
      setEndCursor(selectionStart + len);
    }
  };

  const onClickFontStyleBtn = (specialString) => {
    const { selectionStart, selectionEnd } = markDownEditorRef.current;

    if (selectionEnd !== selectionStart) {
      onChange(
        editorValue.substring(0, selectionStart) +
          specialString +
          editorValue.substring(selectionStart, selectionEnd) +
          specialString +
          editorValue.substring(selectionEnd)
      );
      setCursor(selectionStart + specialString.length);
      setEndCursor(selectionEnd + specialString.length);
    } else {
      onChange(
        editorValue.substring(0, selectionStart) +
          specialString +
          "텍스트" +
          specialString +
          editorValue.substring(selectionEnd)
      );
      setCursor(selectionStart + specialString.length);
      setEndCursor(selectionStart + specialString.length + 3);
    }
  };

  // ? 이미지 기능
  const insertImgIntoTextArea = (file) => {
    if (!file) return;
    const { selectionStart, selectionEnd } = markDownEditorRef.current;

    uploadImg(file).then((res) => {
      onChange(
        editorValue.substring(0, selectionStart) +
          `![](${res})` +
          editorValue.substring(selectionEnd)
      );
    });
  };
  const dataTransferItemListToFile = (dataTransferItemList) => {
    // 이미지 파일이 아닌 경우 return

    const items = [].slice.call(dataTransferItemList).filter((item) => {
      return item.type.indexOf("image") !== -1;
    });
    if (items.length === 0) return;
    return items[0].getAsFile();
  };
  // ? 마크다운 코드 문법 /////////
  const onClickCodeBtn = () => {
    const { selectionStart, selectionEnd } = markDownEditorRef.current;

    if (selectionEnd !== selectionStart) {
      onChange(
        editorValue.substring(0, selectionStart) +
          `\`\`\`\n` +
          editorValue.substring(selectionStart, selectionEnd) +
          `\n\`\`\`` +
          editorValue.substring(selectionEnd)
      );
      setCursor(selectionStart + 4);
      setEndCursor(selectionEnd + 4);
    } else {
      onChange(
        editorValue.substring(0, selectionStart) +
          `\`\`\`\n` +
          "코드를 입력하세요...\n" +
          `\`\`\`` +
          editorValue.substring(selectionEnd)
      );
      setCursor(selectionStart + 4);
      setEndCursor(selectionStart + 16);
    }
  };

  // ? 링크텍스트
  const onClickLinkBtn = () => {
    const { selectionStart, selectionEnd } = markDownEditorRef.current;

    if (selectionEnd !== selectionStart) {
      onChange(
        editorValue.substring(0, selectionStart) +
          "[" +
          editorValue.substring(selectionStart, selectionEnd) +
          "]()" +
          editorValue.substring(selectionEnd)
      );
      setCursor(selectionStart + 1);
      setEndCursor(selectionEnd + 1);
    } else {
      onChange(
        editorValue.substring(0, selectionStart) +
          "[링크텍스트]()" +
          editorValue.substring(selectionEnd)
      );
      setCursor(selectionStart + 1);
      setEndCursor(selectionStart + 6);
    }
  };
  // ? 인용 문법
  const insertBlockQuote = () => {
    const { selectionStart, selectionEnd } = markDownEditorRef.current;

    if (selectionEnd !== selectionStart) {
      onChange(
        editorValue.substring(0, selectionStart) +
          "\n" +
          "> " +
          editorValue.substring(selectionStart)
      );
      setCursor(selectionStart + 1);
      setEndCursor(selectionEnd + 1);
    } else {
      onChange(
        editorValue.substring(0, selectionStart) +
          "> " +
          editorValue.substring(selectionStart)
      );
    }
  };

  const enterSpecialChar = ({ selectionStart, selectionEnd }, char, len) => {
    onChange(
      editorValue.substring(0, selectionStart) +
        char +
        editorValue.substring(selectionEnd)
    );
    setCursor(selectionStart + len);
    setEndCursor(selectionStart + len);
  };

  return (
    <>
      <MarkdownEditorToolBox
        onClickHeadingBtn={onClickHeadingBtn}
        onClickFontStyleBtn={onClickFontStyleBtn}
        onClickImageBtn={insertImgIntoTextArea}
        onClickCodeBtn={onClickCodeBtn}
        onClickLinkBtn={onClickLinkBtn}
        onClickBlockQuoteBtn={insertBlockQuote}
      />
      <MarkdownEditor
        data={editorValue}
        refPorps={markDownEditorRef}
        onChange={(e) => onChange(e.target.value)}
        onPaste={(e) => {
          insertImgIntoTextArea(
            dataTransferItemListToFile(e.clipboardData.items)
          );
        }}
        onDrop={(e) => {
          e.preventDefault();
          insertImgIntoTextArea(
            dataTransferItemListToFile(e.dataTransfer.items)
          );
        }}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault();
            enterSpecialChar(e.target, "\t", 1);
          } else if (e.key === "Enter") {
            e.preventDefault();
            enterSpecialChar(e.target, "  \n", 3);
          } else if (e.key === '"') {
            e.preventDefault();
            enterSpecialChar(e.target, '"', 1);
          }
        }}
      />
    </>
  );
}
