import React, { useState } from "react";
import styled from "styled-components";
import shadow from "../../lib/style/shadow";
import media from "../../lib/style/media";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../redux/loginState";

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
  ${media.small} {
    width: 77%;
  }
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

  ${media.small} {
    font-size: 1.2rem;
  }
  &:hover {
    color: ${({ theme }) => theme.greyColor};
  }
`;

const WriteButton = styled.button`
  width: 15%;
  background-color: ${({ theme }) => theme.btnColor};
  border-radius: 4px;
  color: ${({ theme }) => theme.oppositeColor};
  font-weight: 800;
  ${media.small} {
    width: 22%;
    font-size: 1.3rem;
  }
`;

const MenuName = ["Main", "My", "Read", "Update"];
export default function MainPageMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.login);
  const [selectedMenuId, setSelectedMenuId] = useState(0);

  const onClickNewPost = () => {
    if (loggedIn) {
      navigate("/writeNewPost");
    } else {
      dispatch(loginActions.onToggleLoginForm());
    }
  };
  return (
    <MainPageMenuBlock>
      <MenuList>
        {MenuName.map((item, idx) => (
          <MenuItem
            key={item + idx}
            className={idx === selectedMenuId && "selected"}
            onClick={() => {
              setSelectedMenuId(idx);
              navigate(`/${item}`);
            }}
          >
            {item}
          </MenuItem>
        ))}
      </MenuList>
      <WriteButton onClick={onClickNewPost}>포스트 작성</WriteButton>
    </MainPageMenuBlock>
  );
}
