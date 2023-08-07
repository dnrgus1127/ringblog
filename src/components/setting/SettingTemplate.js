import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import media from "../../lib/style/media";
import { settingActions } from "../../store/settingState";
import { CancelButton } from "../common/button/Button";
import ProfileSection from "../../container/Setting/ProfileSection";
import SettingMenu from "./SettingMenu";
import AccountSection from "../../container/Setting/AccountSection";
import PasswordSection from "../../container/Setting/PasswordSection";

const Screen = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);

  position: fixed;
  top: 0;
  left: 0;
  z-index: 10303;

  ${media.small} {
    padding: 0;
    height: 100vh;
    overflow-y: auto;
  }
  ${media.xsmall} {
    padding-right: 0;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScreenContents = styled.div`
  width: 80vw;
  height: 80vh;
  overflow-y: auto;

  background-color: ${({ theme }) => theme.bgElement2};
  padding: 0.5rem 1.5rem;

  .spaceFlex {
    display: flex;
    justify-content: space-between;
  }
  .top {
    margin-bottom: 1rem;
    align-items: center;
  }
  .settingContents {
    height: 90%;
  }

  ${media.small} {
    width: 100%;
    height: 100%;
    padding: 1rem 1.5rem;
    .settingContents {
      display: block;
    }
  }
`;

const Pane = styled.div`
  width: 69%;
  ${media.small} {
    width: 100%;
  }
`;
const MenuPane = styled(Pane)`
  width: 30%;
  ${media.small} {
    width: 100%;
  }
`;
const itemList = (index) => {
  if (index === 0) {
    return <ProfileSection />;
  }
  if (index === 1) {
    return <AccountSection />;
  }
  if (index === 2) {
    return <PasswordSection />;
  }
};

export default function SettingTemplate() {
  const dispatch = useDispatch();
  const { selectedMenuNumber } = useSelector((state) => state.setting);
  const closeSetting = () => {
    dispatch(settingActions.onToggleVisible());
  };

  return (
    <Screen>
      <ScreenContents>
        <div className='spaceFlex top'>
          <h2>설정</h2>
          <CancelButton onClick={closeSetting}>닫기</CancelButton>
        </div>
        <div className='spaceFlex settingContents'>
          <MenuPane>
            <SettingMenu />
          </MenuPane>
          <Pane>{itemList(selectedMenuNumber)}</Pane>
        </div>
      </ScreenContents>
    </Screen>
  );
}
