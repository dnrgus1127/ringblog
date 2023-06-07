// ? "TextArea" for markdown input
// ? 마크다운 입력을 위한 TextArea 영역

import React, { useEffect, useRef, useState } from "react";
import { uploadImg } from "../../functions/fetch";
import EditorToolBox from "./EditorToolBox";

/**
 * 마크다운을 입력받는 컴포넌트
 * @props data,onChange
 * @return textArea HTMLTag
 */
export default function MarkdownInput({ data, onChange, onBlur }) {
  const taRef = useRef();
  const [cursor, setCursor] = useState(0);
  const [endCursor, setEndCursor] = useState(0);

  // tab, enter 등 특수문자 입력시
  /**
   * contents에 특수문자 입력하는 함수
   * @param {*} HTMLnode (e.target)
   * @param {*} char 특수문자("\t","\n")
   */
  const enterSpecialChar = (
    { value, selectionStart, selectionEnd },
    char,
    len
  ) => {
    onChange(
      value.substring(0, selectionStart) + char + value.substring(selectionEnd)
    );
    setCursor(selectionStart + len);
    setEndCursor(selectionStart + len);
  };

  const onClickHeading = (char, len) => {
    const { value, selectionStart, selectionEnd } = taRef.current;
    if (selectionEnd !== selectionStart) {
      onChange(
        value.substring(0, selectionStart) +
          char +
          value.substring(selectionStart)
      );
      setCursor(selectionEnd + len);
      setEndCursor(selectionEnd + len);
    } else {
      onChange(
        value.substring(0, selectionStart) +
          char +
          value.substring(selectionEnd)
      );
    }
    setCursor(selectionStart + len);
    setEndCursor(selectionStart + len);
    taRef.current.focus();
  };

  const onClickBold = (len) => {
    const { value, selectionStart, selectionEnd } = taRef.current;
    if (selectionEnd !== selectionStart) {
      onChange(
        value.substring(0, selectionStart) +
          `**` +
          value.substring(selectionStart, selectionEnd) +
          "**" +
          value.substring(selectionEnd)
      );
      setCursor(selectionStart + 2);
      setEndCursor(selectionStart + selectionEnd - selectionStart + 2);
    } else {
      onChange(
        value.substring(0, selectionStart) +
          `**텍스트**` +
          value.substring(selectionEnd)
      );
      setCursor(selectionStart + 2);
      setEndCursor(selectionStart + 5);
    }
    taRef.current.focus();
  };

  // 특수문자 입력 후 커서 위치 조정하는 hook
  useEffect(() => {
    taRef.current.setSelectionRange(cursor, endCursor);
  }, [cursor, endCursor]);

  return (
    <>
      <EditorToolBox onHeading={onClickHeading} onBold={onClickBold} />
      <textarea
        ref={taRef}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onPaste={(e) => pasteImg(e, onChange, setCursor)}
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
        value={data}
        onBlur={onBlur}
      ></textarea>
    </>
  );
}

function pasteImg(evt, onChange, setCursor) {
  const { value, selectionStart, selectionEnd } = evt.target;
  const clipboardItems = evt.clipboardData.items;
  const items = [].slice.call(clipboardItems).filter(function (item) {
    // Filter the image items only
    return item.type.indexOf("image") !== -1;
  });
  if (items.length === 0) {
    return;
  }

  const item = items[0];
  // Get the blob of image
  const blob = item.getAsFile();
  uploadImg(blob).then((res) => {
    onChange(
      value.substring(0, selectionStart) +
        `![](${res})` +
        value.substring(selectionEnd)
    );
    setCursor(selectionStart + 22);
  });
}
