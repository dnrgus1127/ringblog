import React, { useState } from "react";
import styled from "styled-components";
import shadow from "../../lib/style/shadow";

const MainPageMenuBlock = styled.div`
  width: 100%;
  display: flex;
  gap: 1%;
`;

const MenuList = styled.div`
  background-color: ${({ theme }) => theme.bgElement};
  border-radius: 4px;
  ${shadow.large};
  display: flex;
  width: 84%;
`;

const MenuItem = styled.div`
  padding: 1rem 2rem;
  color: ${({ theme }) => theme.pointColor};
  font-size: 1.6rem;
  font-weight: 600;
  font-family: "Roboto", sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  &.selected {
    color: ${({ theme }) => theme.color};
  }
`;

const WriteButton = styled.button`
  width: 15%;
  background-color: ${({ theme }) => theme.btnColor};
  border-radius: 4px;
  color: ${({ theme }) => theme.oppositeColor};
  font-weight: 800;
`;

const MenuName = ["Hot", "New", "Follow", "Update"];
export default function MainPageMenu() {
  const [selectedMenuId, setSelectedMenuId] = useState(0);
  return (
    <MainPageMenuBlock>
      <MenuList>
        {MenuName.map((item, idx) => (
          <MenuItem
            key={item + idx}
            className={idx === selectedMenuId && "selected"}
            onClick={() => setSelectedMenuId(idx)}
          >
            {item}
          </MenuItem>
        ))}
      </MenuList>
      <WriteButton>포스트 작성</WriteButton>
    </MainPageMenuBlock>
  );
}
