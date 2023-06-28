import React, { useState } from "react";
import styled from "styled-components";
import useBoolean from "../../Hooks/useBoolean";
import { BtnCss, ColorButton } from "../Button";

const PublishCreateBlock = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.bgElement2};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);

  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  input {
    width: 100%;
    background-color: ${({ theme }) => theme.bgElement3};
    padding: 0.5rem 2rem;
    font-size: 1.5rem;
  }

  .btnWrap {
    margin-top: 1rem;

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

  const createSeries = async () => {
    const result = await onCreateSeries(seriesTitle);
    if (result) {
      setSeriesTitle("");
      onToggleShowBtns();
    }
  };

  return (
    <PublishCreateBlock>
      <input
        type='text'
        value={seriesTitle}
        placeholder='시리즈 이름을 입력하세요..'
        onFocus={() => {
          setShowBtns(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createSeries();
          }
        }}
        onChange={(e) => setSeriesTitle(e.target.value)}
      />
      {showBtns ? (
        <div className='btnWrap'>
          <CancelButton onClick={onToggleShowBtns}>취소</CancelButton>
          <ConfirmButton onClick={createSeries}>시리즈 추가</ConfirmButton>
        </div>
      ) : null}
    </PublishCreateBlock>
  );
}
