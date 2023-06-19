import React from "react";
import { useSelector } from "react-redux";
import AuthScreenTemplate from "../../components/common/Auth/AuthScreenTemplate";
import useBoolean from "../../Hooks/useBoolean";
import SocialLoginContainer from "./SocialLoginContainer";
import LoginContainer from "./LoginContainer";
import RegisterContainer from "./RegisterContainer";

export default function AuthScreen({ onOff }) {
  const { loggedIn } = useSelector((state) => state.login);
  const [isLoginVisible, onToggleLoginVisible] = useBoolean(true);

  if (loggedIn) return;
  return (
    <AuthScreenTemplate
      screenOff={onOff}
      isLoginVisible={isLoginVisible}
      onToggleLoginVisible={onToggleLoginVisible}
      login={<LoginContainer onOff={onToggleLoginVisible} />}
      socialLogin={<SocialLoginContainer />}
      register={<RegisterContainer />}
    />
  );
}
