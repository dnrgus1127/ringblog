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
  const { thumbNailPath } = useSelector((state) => state.write);
  const dispatch = useDispatch();
  const fileSelector = useRef();

  const clickSelecter = () => {
    fileSelector.current.click();
  };
  const fileOnChange = (e) => {
    dispatch(writeActions.setThumbNailPath(e.target.files[0]));
  };

  return (
    <ThumbnailBox>
      <img
        src={
          !thumbNailPath ? thumbnailDefault : URL.createObjectURL(thumbNailPath)
        }
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
