import React from "react";
import Header from "../components/Header/Header";
import PostListContainer from "../container/main/PostListContainer";
// import MainPageMenu from "../../components/mainPage/MainPageMenu";
import styled from "styled-components";
import MainPagePostSlideContainer from "../container/main/MainPagePostSlideContainer";
import Margin from "../components/common/design/Margin";

const MainPageBody = styled.div`
  width: var(--width);
  margin: 0 auto;
  padding-top: calc(var(--header) * 1.5);
  .menuAndWriteBtn {
    display: flex;
    justify-content: space-between;
  }
`;

export default function MainPage() {
  return (
    <>
      <Header />
      <MainPageBody>
        {/* <div className='menuAndWriteBtn'>
          <MainPageMenu />
        </div> */}
        <Margin>
          <MainPagePostSlideContainer />
        </Margin>
        <PostListContainer />
      </MainPageBody>
    </>
  );
}