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

const Container = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => (props.slide ? "10vw" : "100vw")};
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.bgElement};
  display: flex;
  align-items: center;
  transition: 0.2s all ease-in-out;
  box-shadow: ${(props) =>
    props.slide ? "0px 0px 60px rgba(150, 242, 215, 0.3);" : "none"};
`;

const Wrapper = styled.div`
  /* width: calc(var(--width) * 0.4); */
  margin: 0 auto;
  height: 50vh;
  display: flex;

  .default {
    width: calc(var(--width) * 0.4);
  }
  .setting {
    width: calc(var(--width) * 0.4);
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
`;

export default function UpCommingMenu({
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
    // ! - writer, ?????? ??? ?????? ??????
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
              <img src={serverFile} alt='?????????' />
            ) : (
              <img
                src={
                  file === null ? thumbnailDefault : URL.createObjectURL(file)
                }
                alt='?????????'
              />
            )}
            <div className='btnWrap'>
              <Button
                bg={"rgba(64,64,64,.8)"}
                color={"var(--btn-color)"}
                onClick={fileSelectorClick}
              >
                ????????? ?????????
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
              placeholder='????????? ????????? ??????...'
              onChange={(e) => {
                setPreview(e.target.value);
              }}
              value={preview || ""}
            ></textarea>
          </Preview>
          <ButtonBox>
            <Btn bg={true} onClick={index ? editPost : postNewPost}>
              ??????
            </Btn>
            <Btn onClick={onOffEvent}>??????</Btn>
          </ButtonBox>
        </div>

        <div className='setting'>
          <h2>????????? ??????</h2>
          <NewPostSetting setSeries={setSeriesId} />
        </div>
      </Wrapper>
    </Container>
  );
}
