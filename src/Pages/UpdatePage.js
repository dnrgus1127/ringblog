import React from "react";
import Header from "../components/Header/Header";
import styled from "styled-components";
import UpdateContainer from "../container/Update/UpdateContainer";

const UpdatePageBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentsWrap = styled.div`
  margin-top: calc(var(--header) * 2);
  width: var(--width);
`;

export default function UpdatePage() {
  return (
    <UpdatePageBlock>
      <Header />
      <ContentsWrap>
        <UpdateContainer />
      </ContentsWrap>
    </UpdatePageBlock>
  );
}
