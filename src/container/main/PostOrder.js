import React from "react";
import UnderBarButtonsBox from "../../components/common/button/UnderBarButtonsBox";
import UnderBarBtn from "../../components/common/button/UnderBarBtn";
import { useRef } from "react";

const btnList = ["인기순", "최신순"];
export default function PostOrder({ buttonIndex, setButtonIndex }) {
  const prevIndex = useRef(null);
  return (
    <>
      <UnderBarButtonsBox
        selected={buttonIndex}
        prevSelected={prevIndex.current}
      >
        {btnList.map((item, idx) => (
          <UnderBarBtn
            key={item + idx}
            onClick={() => {
              prevIndex.current = buttonIndex;
              setButtonIndex(idx);
            }}
            selected={buttonIndex === idx}
          >
            {item}
          </UnderBarBtn>
        ))}
      </UnderBarButtonsBox>
    </>
  );
}
