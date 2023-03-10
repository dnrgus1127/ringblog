import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgElement2};
  box-shadow: 0px 0p 5px rgba(0, 0, 0, 0.7);
  height: 8vh;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btnWrap {
    display: flex;
  }
`;

const Btn = styled.button`
  font-size: 2rem;
  font-weight: 800;
  font-family: "Noto Sans KR", sans-serif;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(64, 64, 64, 0.7);
  }
`;

const BtnBack = styled(Btn)`
  padding: 0.5rem 2rem;
  border-radius: 4px;
`;

const Button = styled(Btn)`
  background-color: ${({ theme }) =>
    (props) =>
      props.bg ? theme.btnColor : "none"};

  padding: 0.5rem 2rem;
  border-radius: 4px;
  color: ${({ theme }) =>
    (props) =>
      props.bg ? theme.oppositeColor : theme.btnColor};
  margin-left: 2rem;
  &:hover {
    background-color: ${({ theme }) =>
      (props) =>
        props.bg ? theme.btnHover : "none"};
  }
`;

export default function UnderMenu({ index, onClick }) {
  return (
    <Container>
      <Link to={"/"}>
        <BtnBack>나가기</BtnBack>
      </Link>
      <div className='btnWrap'>
        <Button onClick={onClick} bg={false}>
          임시저장
        </Button>
        <Button bg={true} onClick={onClick}>
          {index ? "수정하기" : "제출하기"}
        </Button>
      </div>
    </Container>
  );
}
