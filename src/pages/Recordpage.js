import React from "react";
import Header from "../components/Header/Header";
import styled from "styled-components";
import XNavgation from "../components/common/XNavgation";
import { useState } from "react";
import RecordSubscription from "../components/page/RecordPage/RecordSubscription";
import RecordComments from "../components/page/RecordPage/RecordComments";
import useIsLogin from "../Hooks/useIsLogin";
import RecordRcmnd from "../components/page/RecordPage/RecordRcmnd";

const Container = styled.div`
  padding-top: calc(var(--header) * 2);
`;

const Wrapper = styled.div`
  width: var(--width);
  margin: 0 auto;

  .menuWrap {
    width: 60%;
    margin: 0 auto;
    margin-bottom: 2rem;
  }

  @media (max-width: 640px) {
    .menuWrap {
      width: 100%;
    }
  }
`;

const menuItems = ["구독한 블로거", "좋아요 누른 글", "내가 쓴 댓글"];
export default function Recordpage({ theme, toggleTheme }) {
  const [menuIndex, setIndex] = useState(0);

  useIsLogin(menuIndex);

  const Menu = () => {
    switch (menuIndex) {
      case 0:
        return <RecordSubscription />;
      case 1:
        return <RecordRcmnd />;
      case 2:
        return <RecordComments />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Wrapper>
        <div className='menuWrap'>
          <XNavgation items={menuItems} index={menuIndex} setIndex={setIndex} />
        </div>
        <div className='menuContentsWrap'>{Menu()}</div>
      </Wrapper>
    </Container>
  );
}
