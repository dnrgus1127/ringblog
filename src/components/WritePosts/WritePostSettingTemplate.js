import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import media from "../../lib/style/media";
import { writeActions } from "../../redux/writeReducer";

const Container = styled.div`
  position: absolute;
  left: ${(props) => (props.slide ? "0vw" : "100vw")};
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.bgElement};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 768px;
  /* background-color: ${({ theme }) => theme.bgElement2}; */
  border-radius: 4px;
  display: flex;

  ${media.small} {
    width: 708px;
  }
`;

const Pane = styled.div`
  flex: 1;
`;
const RightPane = styled(Pane)``;

const Separator = styled.div`
  min-height: 468px;
  width: 1px;
  background-color: ${({ theme }) => theme.greyColor};
  box-shadow: 0px 0px 12px rgba(255, 255, 255);
  margin: 0 2rem;
`;

export default function WritePostSettingTemplate({ visible, left, right }) {
  const write = useSelector((state) => state.write);
  const dispatch = useDispatch();

  return (
    <Container slide={visible}>
      <Wrapper>
        <Pane>{left}</Pane>
        <Separator></Separator>
        <RightPane>{right}</RightPane>
      </Wrapper>
    </Container>
  );
}
