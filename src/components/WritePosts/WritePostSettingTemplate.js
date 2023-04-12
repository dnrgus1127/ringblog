import React from "react";

import styled from "styled-components";
import media from "../../lib/style/media";

const Container = styled.div`
  position: absolute;
  left: ${(props) => (props.slide ? "0vw" : "100vw")};
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;

  background-color: ${({ theme }) => theme.bgElement};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Wrapper = styled.div`
  width: 768px;
  border-radius: 4px;
  display: flex;

  ${media.small} {
    width: 640px;
    flex-direction: column;
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

  ${media.small} {
    display: none;
  }
`;

export default function WritePostSettingTemplate({ visible, left, right }) {
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
