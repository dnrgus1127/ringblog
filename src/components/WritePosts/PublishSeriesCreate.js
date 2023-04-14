import React, { useState } from "react";
import styled from "styled-components";
import useBoolean from "../../Hooks/useBoolean";
import { BtnCss, ColorButton } from "../Button";

const PublishCreateBlock = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.bgElement3};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  input {
    width: 100%;
    background-color: ${({ theme }) => theme.bgElement};
    padding: 0.5rem 2rem;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .btnWrap {
    text-align: end;
  }
  button {
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
  }
`;

const CancelButton = styled(BtnCss)``;

const ConfirmButton = styled(ColorButton)``;

export default function PublishSeriesCreate({ onCreateSeries }) {
  const [showBtns, onToggleShowBtns, setShowBtns] = useBoolean(false);
  const [seriesTitle, setSeriesTitle] = useState("");

  return (
    <PublishCreateBlock>
      <input
        type='text'
        value={seriesTitle}
        placeholder='시리즈 이름을 입력하세요..'
        onFocus={() => {
          setShowBtns(true);
        }}
        onChange={(e) => setSeriesTitle(e.target.value)}
      />
      {showBtns ? (
        <div className='btnWrap'>
          <CancelButton onClick={onToggleShowBtns}>취소</CancelButton>
          <ConfirmButton
            onClick={() => {
              const result = onCreateSeries(seriesTitle);
              if (result) {
                setSeriesTitle("");
                onToggleShowBtns();
              }
            }}
          >
            시리즈 추가
          </ConfirmButton>
        </div>
      ) : null}
    </PublishCreateBlock>
  );
}
