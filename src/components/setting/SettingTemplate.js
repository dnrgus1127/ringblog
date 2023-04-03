import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { settingActions } from "../../redux/settingState";
import { CancelButton } from "../common/Button";
import ProfileSection from "./ProfileSection";
import SettingMenu from "./SettingMenu";

const Screen = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 12rem;
  background-color: rgba(0, 0, 0, 0.5);

  position: absolute;
  top: 0;
  left: 0;
  z-index: 10003;
`;

const ScreenContents = styled.div`
  border-radius: 4px;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.bgElement2};
  padding: 0.5rem 1.5rem;

  .spaceFlex {
    display: flex;
    justify-content: space-between;
  }
  .top {
    margin-bottom: 1rem;
  }
  .settingContents {
    height: 90%;
  }
`;

const Pane = styled.div`
  width: 69%;
`;
const MenuPane = styled(Pane)`
  width: 30%;
`;
const itemList = (index) => {
  if (index === 0) {
    return <ProfileSection />;
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
