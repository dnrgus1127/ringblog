import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useBoolean from "../../Hooks/useBoolean";
import useFetchPost from "../../Hooks/useFetchPost";
import { BtnCss, ColorButton } from "../Button";

const Container = styled.div`
  .newSeriesBtns {
    text-align: end;
  }
`;

const SeriesSetting = styled.div`
  background-color: ${({ theme }) => theme.bgElement3};

  .selected {
    background-color: ${({ theme }) => theme.bgElement2};
    color: ${({ theme }) => theme.btnColor};
  }

  max-height: 40vh;
  overflow: auto;
`;

const Item = styled.div`
  padding: 1rem 1.5rem;
  text-align: start;
  border-bottom: 0.5px solid ${({ theme }) => theme.greyColor};
  color: ${({ theme }) => theme.greyColor};
  font-size: 1.8rem;
  font-weight: 800;
  cursor: pointer;

  input,
  button {
    font-size: inherit;
    font-weight: inherit;
  }
`;

const NewSeries = styled(Item)`
  text-align: center;
  button {
    color: ${({ theme }) => theme.warning};
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
export default function NewPostSeries({ data, cancel, update, index, select }) {
  const [onNewSeries, onToggelNewSeries] = useBoolean(false);

  return (
    <Container>
      <SeriesSetting>
        <NewSeries>
          <button onClick={onToggelNewSeries}>새 시리즈 생성 +</button>
        </NewSeries>
        {onNewSeries ? (
          <NewItem cancel={onToggelNewSeries} update={update} />
        ) : null}

        {data.map((item, idx) => (
          <Item
            key={idx}
            onClick={() => {
              select(idx);
            }}
            className={index === idx ? "selected" : null}
          >
            {item.title}
          </Item>
        ))}
      </SeriesSetting>
      <div className='newSeriesBtns'>
        <Btn onClick={cancel}>취소</Btn>
        <ColorBtn onClick={cancel}>시리즈 선택 완료</ColorBtn>
      </div>
    </Container>
  );
}

function NewItem({ cancel, update }) {
  const { loggedUser } = useSelector((state) => state.login);
  const [title, setTitle] = useState("");

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
    update({});
    cancel();
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
