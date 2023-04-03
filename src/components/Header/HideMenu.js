import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { settingActions } from "../../redux/settingState";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 80vh;
  background-color: ${({ theme }) => theme.bgElement};
  width: 100%;
  transform: translateY(-100%);
  transition: 0.3s all ease-out;
  padding-top: calc(var(--header) * 0.75);
  z-index: 9998;

  .wrap {
    width: var(--width);
    margin: 0 auto;
  }
`;
const SiteMap = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 var(--gap);
`;

const UserMenu = styled.div`
  display: flex;
  justify-content: end;

  & > .border {
    padding: 1.5rem;
  }

  h2 {
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.btnColor};
  }
  ul {
    list-style: none;
  }
  li {
    cursor: pointer;
    margin: 1rem;
    font-weight: 600;
  }

  li:hover {
    color: ${({ theme }) => theme.warning};
  }
`;

export default function HideMenu({ trigger }) {
  const { loggedUser, loggedIn } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const toggleSetting = () => {
    dispatch(settingActions.onToggleVisible());
  };

  const userInfo = (
    <UserMenu>
      <div className='border'>
        <h2>{loggedUser.username}님</h2>
        <ul>
          <Link to={`/UserBlog?writer=${loggedUser.userId}`}>
            <li>내 블로그</li>
          </Link>
          <Link to={"/RecordPage"}>
            <li>읽기 목록</li>
          </Link>
          <li onClick={toggleSetting}>설정</li>
          <li>로그아웃</li>
        </ul>
      </div>
    </UserMenu>
  );

  return (
    <Container
      style={
        trigger
          ? { transform: "translateY(0%)" }
          : { transform: "translateY(-100%)" }
      }
    >
      <div className='wrap'>
        {loggedIn ? userInfo : null}
        <SiteMap></SiteMap>
      </div>
    </Container>
  );
}
