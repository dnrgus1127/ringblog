import React, { useRef, useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Context } from "../../functions/Login/LoginProvider";
import useBoolean from "../../Hooks/useBoolean";
import useFetchPost from "../../Hooks/useFetchPost";
import { BtnCss, ColorButton } from "../Button";

const Container = styled.div`
  .selected {
    background-color: ${({ theme }) => theme.bgElement2};
    color: ${({ theme }) => theme.btnColor};
  }

  max-height: 40rem;
  overflow: auto;

  .newSeriesBtns {
    text-align: end;
  }
`;

const Item = styled.div`
  padding: 1rem 1.5rem;
  text-align: start;
  border-bottom: 0.5px solid ${({ theme }) => theme.greyColor};
  color: ${({ theme }) => theme.greyColor};
  font-size: 1.8rem;
  font-weight: 800;
  cursor: pointer;

  input {
    font-size: inherit;
    font-weight: inherit;
  }
`;

const ColorBtn = styled(ColorButton)`
  margin: 0;
  font-size: 1.4rem;
  &:hover {
    transform: none;
  }
`;
const Btn = styled(BtnCss)`
  margin: 0;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color};
  &:hover {
    transform: none;
  }
`;
export default function NewPostSeries({ data, cancel }) {
  const [seriesIndex, setIndex] = useState();
  const [onNewSeries, onToggelNewSeries] = useBoolean(false);

  return (
    <Container>
      {data.map((item, idx) => (
        <Item
          key={idx}
          onClick={() => {
            setIndex(idx);
          }}
          className={seriesIndex === idx ? "selected" : null}
        >
          {item.title}
        </Item>
      ))}
      {onNewSeries ? <NewItem cancel={onToggelNewSeries} /> : null}
      <div>
        <button onClick={onToggelNewSeries}>새 시리즈 생성</button>
        <button onClick={cancel}>cancel</button>
      </div>
    </Container>
  );
}

function NewItem({ cancel }) {
  const { loggedUser } = useContext(Context);
  const [title, setTitle] = useState();

  const [fetchNewSeries, result] = useFetchPost();
  const newRef = useRef();

  useEffect(() => {
    newRef.current.focus();
  }, []);

  useEffect(() => {
    result && console.log(result.success);
  }, [result]);

  const createNewSeries = () => {
    fetchNewSeries(`/series/newSeries`, {
      title: title,
      writer: loggedUser.userId,
    });
  };

  return (
    <>
      <Item>
        <input
          ref={newRef}
          value={title}
          placeholder={"새 시리즈 이름 작성"}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
      </Item>
      <div className='newSeriesBtns'>
        <Btn onClick={cancel}>취소</Btn>
        <ColorBtn onClick={createNewSeries}>새 시리즈 추가</ColorBtn>
      </div>
    </>
  );
}
