import React, { useState } from "react";
import styled from "styled-components";
import { ColorButton } from "../Button";
import Gnb from "../Gnb";
import HideMenu from "./HideMenu";
import { useDispatch, useSelector } from "react-redux";
import SettingScreen from "../../container/Setting/SettingPage";
import media from "../../lib/style/media";
import { loginActions } from "../../redux/loginState";
import Logo from "./Logo";
import AuthScreen from "../../container/Auth/AuthScreen";
import { ConfirmButton } from "../common/button/Button";
import useAuth from "../../Hooks/Login/useAuth";

const HeaderCon = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: ${({ theme }) => theme.bgColor};
  z-index: 9000;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
`;

const ContentWrap = styled.div`
  width: var(--width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  @media (max-width: 640px) {
    width: 90vw;
  }

  .userName {
    margin-right: 2rem;
  }
  .userName span {
    font-weight: 800;
    color: ${({ theme }) => theme.btnColor};
  }

  .loginMenus {
    display: flex;
    align-items: center;
    ${media.small} {
      display: none;
    }
  }
`;

const LoginFromWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const LoginButton = styled(ColorButton)`
  padding: 0.8rem 1.4rem;
  font-size: 1.6rem;
`;

export default function Header() {
  const [hideMenu, setHideMenu] = useState(false);
  const dispatch = useDispatch();
  const { onLoginForm: loginForm } = useSelector(
    (state) => state.login.loginForm
  );
  const { loggedUser, loggedIn } = useSelector((state) => state.login);
  const { settingVisible } = useSelector((state) => state.setting);

  const ControllLoginForm = () => {
    dispatch(loginActions.onToggleLoginForm());
  };
  const { logout } = useAuth();
  return (
    <HeaderCon>
      <HideMenu trigger={hideMenu} onToggleTrigger={setHideMenu} />
      <ContentWrap>
        <Logo />

        <div style={{ display: "flex", alignItems: "center" }}>
          <div className='loginMenus'>
            {loggedIn ? (
              <>
                <p className='userName'>
                  <span>{loggedUser.username}</span>님 환영합니다.
                </p>
                <ConfirmButton onClick={logout}>로그아웃</ConfirmButton>
              </>
            ) : (
              <LoginButton className='loginBtn' onClick={ControllLoginForm}>
                로그인
              </LoginButton>
            )}
          </div>

          <Gnb setHideMenu={setHideMenu} hideMenu={hideMenu} />
        </div>

        {loginForm && (
          <LoginFromWrap>
            {/* <LoginForm onOff={ControllLoginForm} /> */}
            <AuthScreen onOff={ControllLoginForm} />
          </LoginFromWrap>
        )}
        {settingVisible && <SettingScreen />}
      </ContentWrap>
    </HeaderCon>
  );
}
