import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { updatePost, uploadPost } from "../../functions/fetch";
import { timeStamp } from "../../functions/time";
import thumbnailDefault from "../../images/thumbnail2.jpg";
import Button from "../Button";
import NewPostSetting from "./NewPostSetting";
import WritePostSettingTemplate from "./WritePostSettingTemplate";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => (props.slide ? "0vw" : "100vw")};
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.bgElement};
  display: flex;
  align-items: center;
  transition: 0.2s all ease-in-out;
  @media (max-width: 640px) {
    left: ${(props) => (props.slide ? "0vw" : "100vw")};
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  height: 50vh;
  display: flex;

  .default {
    width: calc(var(--width) * 0.4);
  }
  .setting {
    width: calc(var(--width) * 0.4);
  }

  @media (max-width: 640px) {
    display: block;
    height: initial;

    .default {
      width: 100%;
    }
    .setting {
      width: 100%;
      /* display: none; */
    }
  }
`;

const Preview = styled.div`
  width: 100%;
  height: 10vh;
  background-color: ${({ theme }) => theme.bgElement3};
  border-radius: 4px;
  margin-bottom: 1.5rem;

  textarea {
    padding: 1rem 2rem;
    font-family: inherit;
    font-size: 1.5rem;
  }
`;

const ThumbnailBox = styled.div`
  width: 100%;
  height: 30vh;
  border-radius: 0.5rem;
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  position: relative;
  img {
    width: 100%;
    transform: scale(1.1);
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

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Btn = styled.button`
  background: none;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-family: inherit;
  font-size: 2rem;
  font-weight: 800;
  margin-right: 2rem;
  z-index: 2;
  color: ${({ theme }) =>
    (props) =>
      props.bg ? theme.oppositeColor : theme.btnColor};
  background-color: ${({ theme }) =>
    (props) =>
      props.bg ? theme.btnColor : "none"};

  @media (max-width: 640px) {
    font-size: 1.6rem;
  }
`;

export default function WritePostSetting({
  onOff,
  onOffEvent,
  obj,
  index,
  serverData,
}) {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [serverFile, setServerFile] = useState("");
  const fileSelector = useRef();
  const [preview, setPreview] = useState("");
  const [seriesId, setSeriesId] = useState(null);

  const data = {
    ...obj,
    lastMdfdDay: timeStamp(),
    preview: preview,
    seriesId: seriesId,
  };

  /*-------------------------------------------------------*/
  // * Thumbnail function
  const fileSelectorClick = () => {
    fileSelector.current.click();
  };

  const fileOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  /*-------------------------------------------------------*/

  function postNewPost() {
    // ! - writer, 추가 시 수정 요함
    uploadPost(file, data).then((result) => (result ? navigate("/") : null));
  }

  function editPost() {
    updatePost(index, data).then((result) => (result ? navigate("/") : null));
  }

  useEffect(() => {
    setPreview(serverData.preview);

    setServerFile(serverData.thumbnailPath);
  }, [serverData]);

  return (
    <Container slide={onOff}>
      <Wrapper>
        <div className='default'>
          <ThumbnailBox>
            {serverFile !== "null" ? (
              <img src={serverFile} alt='썸네일' />
            ) : (
              <img
                src={
                  file === null ? thumbnailDefault : URL.createObjectURL(file)
                }
                alt='썸네일'
              />
            )}
            <div className='btnWrap'>
              <Button
                bg={"rgba(64,64,64,.8)"}
                color={"var(--btn-color)"}
                onClick={fileSelectorClick}
              >
                썸네일 고르기
              </Button>
              <input
                ref={fileSelector}
                type='file'
                onChange={fileOnChange}
                accept='image/*'
                hidden
              />
            </div>
          </ThumbnailBox>
          <Preview>
            <textarea
              name=''
              id=''
              cols='30'
              rows='10'
              placeholder='포스트 소개글 작성...'
              onChange={(e) => {
                setPreview(e.target.value);
              }}
              value={preview || ""}
            ></textarea>
          </Preview>
        </div>

        <div className='setting'>
          <NewPostSetting setSeries={setSeriesId} />
          <ButtonBox>
            <Btn bg={true} onClick={index ? editPost : postNewPost}>
              제출
            </Btn>
            <Btn onClick={onOffEvent}>취소</Btn>
          </ButtonBox>
        </div>
      </Wrapper>
    </Container>
  );
}
