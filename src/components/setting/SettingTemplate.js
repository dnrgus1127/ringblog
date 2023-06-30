import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import media from "../../lib/style/media";
import { settingActions } from "../../redux/settingState";
import { CancelButton } from "../common/button/Button";
import ProfileSection from "./ProfileSection";
import SettingMenu from "./SettingMenu";
import DeleteAccount from "../../container/Setting/DeleteAccount";

const Screen = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 12rem;
  background-color: rgba(0, 0, 0, 0.5);

  position: absolute;
  top: 0;
  left: 0;
  z-index: 10003;

  ${media.small} {
    padding: 0;
    padding-right: 1rem;
    height: 100vh;
    overflow-y: auto;
  }
  ${media.xsmall} {
    padding-right: 0;
  }
`;

const ScreenContents = styled.div`
  border-radius: 4px;
  width: 100%;
  min-height: 100%;
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
    return <DeleteAccount />;
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
