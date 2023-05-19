import React from "react";
import styled from "styled-components";
import useBoolean from "../../Hooks/useBoolean";
import ToolTip from "../common/ToolTip";

const HashTagBlock = styled.div`
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.bgElement2};
  #hashTagTooltip {
    position: relative;
    span {
      margin-top: 1rem;
    }
  }
  margin-bottom: 1rem;
`;
const HashTagInput = styled.input`
  width: 100%;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.bgElement3};
  border-radius: 4px;
  padding: 0 1rem;
`;

export default function CreateHashTag({ onEnter, hashTags }) {
  const [showTooltip, onToggleToolTip] = useBoolean(false);
  return (
    <>
      <HashTagBlock>
        <HashTagInput
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onEnter(e.target.value);
              e.target.value = "";
              e.target.blur();
            }
          }}
          onFocus={onToggleToolTip}
          onBlur={onToggleToolTip}
        />
        <div id='hashTagTooltip'>
          {showTooltip && hashTags.length === 0 && (
            <ToolTip
              title='해시태그 작성법'
              description='원하는 해시태그를 입력하고 Enter 키를 입력하세요'
            />
          )}
        </div>
      </HashTagBlock>
    </>
  );
}
