import React, { useState } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { updatePost, uploadPost } from "../../functions/fetch";
import { BtnCss } from "../Button";
import thumbnailDefault from "../../images/thumbnail2.jpg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { writeActions } from "../../redux/writeReducer";

const ThumbnailBox = styled.div`
  width: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  position: relative;
  img {
    width: 100%;
    object-fit: cover;
  }
  .btnWrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SelectButton = styled(BtnCss)`
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bgElement3};
  &:hover {
    transform: none;
    transition: none;
    color: ${({ theme }) => theme.btnColor};
  }
`;

export default function ThumbnailSelector() {
  const { thumbnailPath } = useSelector((state) => state.write.data);
  const dispatch = useDispatch();
  const fileSelector = useRef();

  const clickSelecter = () => {
    fileSelector.current.click();
  };
  const fileOnChange = (e) => {
    // file에 대해서 리덕스에 blobURI만 저장해서 메모리 절감 및 non-serializable 경고 해결
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();

    //읽기 동작이 성공적으로 완료되었을 떄 실행되는 onload함수
    reader.onload = () => {
      // blob에 파일 저장 후
      const blob = new Blob([reader.result], { type: file.type });
      // uri로 변경하여
      const blobUri = URL.createObjectURL(blob);
      // redux에 uri 저장
      dispatch(writeActions.setThumbNailPath(blobUri));
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <ThumbnailBox>
      <img
        src={!thumbnailPath ? thumbnailDefault : thumbnailPath}
        alt='썸네일'
      />
      <div className='btnWrap'>
        <SelectButton onClick={clickSelecter}>썸네일 고르기</SelectButton>
        <input
          ref={fileSelector}
          type='file'
          onChange={fileOnChange}
          accept='image/*'
          hidden
        />
      </div>
    </ThumbnailBox>
  );
}
