import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ConfirmButton } from "../common/button/Button";
import Margin from "../common/design/Margin";

const MarkdownLinkBlock = styled.div`
  position: absolute;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.pointColor};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.bgElement2};

  input {
    border-bottom: 1px solid grey;
  }
  button {
    float: right;
  }
  .titleAndCancel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    svg {
      width: 2rem;
      height: 2rem;
      fill: ${({ theme }) => theme.color};
    }
  }
`;

export default function MarkdownInsertLink({ visible, onComfirm, onClose }) {
  const [link, setLink] = useState("");

  const comfirm = () => {
    onComfirm(link);
    setLink("");
    onClose();
  };
  const linkRef = useRef(null);

  // 자동 포커싱
  useEffect(() => {
    visible && linkRef.current.focus();
  }, [linkRef, visible]);

  if (!visible) return;

  return (
    <MarkdownLinkBlock>
      <div className='titleAndCancel'>
        <h4>Link</h4>
        <button onClick={onClose}>
          <svg
            clipRule='evenodd'
            fillRule='evenodd'
            strokeLinejoin='round'
            strokeMiterlimit='2'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z' />
          </svg>
        </button>
      </div>
      <Margin size='custom' value='0.5rem'>
        <input
          ref={linkRef}
          type='text'
          placeholder='URL 입력'
          onChange={(e) => {
            setLink(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();

              comfirm();
            }
          }}
          value={link}
        />
      </Margin>
      <ConfirmButton size='xsmall' onClick={comfirm}>
        확인
      </ConfirmButton>
    </MarkdownLinkBlock>
  );
}
