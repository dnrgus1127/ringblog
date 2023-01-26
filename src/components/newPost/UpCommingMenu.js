import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.bgElement};
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

const Btn = styled.button`
  background: none;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-family: inherit;
  font-size: 2rem;

  color: ${({ theme }) => theme.oppositeColor};
  background-color: ${({ theme }) =>
    (props) =>
      props.bg ? theme.btnColor : "none"};
`;

export default function UpCommingMenu() {
  return (
    <Container>
      <ButtonBox>
        <Btn>취소</Btn>
        <Btn bg={true}>제출</Btn>
      </ButtonBox>
    </Container>
  );
}
