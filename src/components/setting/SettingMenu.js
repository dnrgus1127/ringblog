import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { settingActions } from "../../redux/settingState";

const Menu = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: ${({ theme }) => theme.bgElement}; */
  padding: 1rem 0.8rem;
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
`;

const menus = ["메뉴1", "메뉴2", "메뉴3", "메뉴4"];

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
    </Menu>
  );
}
