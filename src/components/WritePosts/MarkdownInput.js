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

  // 특수문자 입력 후 커서 위치 조정하는 hook
  useEffect(() => {
    taRef.current.setSelectionRange(cursor, endCursor);
    taRef.current.focus();
  }, [cursor, endCursor]);

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

  // ? toolkit functions ////////////////////////////////////
  const onClickHeadingBtn = (char, len) => {
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
      setCursor(selectionStart + len);
      setEndCursor(selectionStart + len);
    }
  };

  const onClickFontStyleBtn = (specialString) => {
    const { value, selectionStart, selectionEnd } = taRef.current;
    if (selectionEnd !== selectionStart) {
      onChange(
        value.substring(0, selectionStart) +
          specialString +
          value.substring(selectionStart, selectionEnd) +
          specialString +
          value.substring(selectionEnd)
      );
      setCursor(selectionStart + specialString.length);
      setEndCursor(selectionEnd + specialString.length);
    } else {
      onChange(
        value.substring(0, selectionStart) +
          specialString +
          "텍스트" +
          specialString +
          value.substring(selectionEnd)
      );
      setCursor(selectionStart + specialString.length);
      setEndCursor(selectionStart + specialString.length + 3);
    }
  };

  // ? 이미지 기능
  const insertImgIntoTextArea = (file) => {
    const { value, selectionStart, selectionEnd } = taRef.current;
    uploadImg(file).then((res) => {
      onChange(
        value.substring(0, selectionStart) +
          `![](${res})` +
          value.substring(selectionEnd)
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
  // ? /////////

  return (
    <>
      <EditorToolBox
        onClickHeadingBtn={onClickHeadingBtn}
        onClickFontStyleBtn={onClickFontStyleBtn}
        onClickImageBtn={insertImgIntoTextArea}
      />
      <textarea
        ref={taRef}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onPaste={(e) =>
          insertImgIntoTextArea(
            dataTransferItemListToFile(e.clipboardData.items)
          )
        }
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
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          insertImgIntoTextArea(
            dataTransferItemListToFile(e.dataTransfer.items)
          );
        }}
      />
    </>
  );
}
