import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import media from "../../lib/style/media";
import { settingActions } from "../../store/settingState";

const Menu = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: ${({ theme }) => theme.bgElement}; */
  padding: 1rem 0.8rem;

  hr {
    display: none;
  }
  ${media.small} {
    padding: 0;
    margin-bottom: 2rem;
    hr {
      display: inherit;
      margin-top: 1rem;
    }
  }
`;

const MenuItem = styled.div`
  padding: 1rem;
  margin-bottom: 1rme;
  font-size: 1.4rem;
  cursor: pointer;
  border-radius: 6px;

  &.selected {
    background-color: ${({ theme }) => theme.bgElement3};
  }
  &:hover {
    background-color: ${({ theme }) => theme.bgElement};
  }

  ${media.small} {
    font-weight: 800;
  }
`;

const menus = ["프로필", "회원탈퇴", "메뉴3", "메뉴4"];

export default function SettingMenu() {
  const { selectedMenuNumber } = useSelector((state) => state.setting);
  const dispatch = useDispatch();

  const setMenuNumber = (index) => {
    dispatch(settingActions.setMenuNumber(index));
  };
  return (
    <Menu>
      {menus.map((item, idx) => (
        <MenuItem
          key={idx}
          className={selectedMenuNumber === idx && "selected"}
          onClick={() => {
            setMenuNumber(idx);
          }}
        >
          {item}
        </MenuItem>
      ))}
      <hr />
    </Menu>
  );
}
