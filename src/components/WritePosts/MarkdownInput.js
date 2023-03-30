// ? "TextArea" for markdown input
// ? 마크다운 입력을 위한 TextArea 영역

import React, { useEffect, useRef, useState } from "react";
import { uploadImg } from "../../functions/fetch";

/**
 * 마크다운을 입력받는 컴포넌트
 * @props data,onChange
 * @return textArea HTMLTag
 */
export default function MarkdownInput({ data, onChange, onBlur }) {
  const taRef = useRef();
  const [cursor, setCursor] = useState(0);

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
  };

  // 특수문자 입력 후 커서 위치 조정하는 hook
  useEffect(() => {
    taRef.current.setSelectionRange(cursor, cursor);
  }, [cursor]);

  return (
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
        }
      }}
      value={data}
      onBlur={onBlur}
    ></textarea>
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
