import React from "react";
import { useRef } from "react";
import styled from "styled-components";
import thumbnailDefault from "../../images/thumbnail2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { writeActions } from "../../redux/writeReducer";
import { Button } from "../common/button/Button";

const ThumbnailBox = styled.div`
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  position: relative;
  img {
    width: 100%;
    height: 30rem;
    border: 1px solid white;
    object-fit: cover;
    display: block;
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
    flex-direction: column;
  }
  button {
    display: block;
  }
`;

const SelectButton = styled(Button)`
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.bgElement3};
  &:hover {
    transform: none;
    transition: none;
    color: ${({ theme }) => theme.btnColor};
  }
`;

const DeleteButton = styled(SelectButton)`
  font-size: 1.4rem;
  padding: 0.8rem 1.6rem;
  color: ${({ theme }) => theme.warning};
  margin: 1rem 0;

  &:hover {
    color: red;
  }
`;

export default function ThumbnailSelector() {
  const { thumbnailPath } = useSelector((state) => state.write.data);
  const dispatch = useDispatch();
  const fileSelector = useRef();

  const clickSelecter = () => {
    fileSelector.current.click();
  };
  const deleteThumbNail = () => {
    dispatch(writeActions.delThumbNailPath());
  };
  const fileOnChange = (e) => {
    // file에 대해서 리덕스에 blobURI만 저장해서 메모리 절감 및 non-serializable 경고 해결
    const file = e.target.files[0];
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
    e.target.value = "";
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
        {thumbnailPath && (
          <DeleteButton onClick={deleteThumbNail}>썸네일 제거</DeleteButton>
        )}
      </div>
    </ThumbnailBox>
  );
}
