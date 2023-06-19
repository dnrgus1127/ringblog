import React from "react";
import SocialLoginForm from "../../components/common/Auth/Login/SocialLoginForm";

export default function SocialLoginContainer() {
  const githubLogin = (e) => {
    e.preventDefault();
    fetch("/oauth/github")
      .then((res) => res.json())
      .then((data) => window.location.replace(data.uri));
  };
  const googleLogin = (e) => {
    fetch("/oauth/google")
      .then((res) => res.json())
      .then((data) => {
        window.location.replace(data.uri);
      });
  };
  const kakaoLogin = () => {
    fetch("/oauth/kakao")
      .then((res) => res.json())
      .then((data) => {
        window.location.replace(data.uri);
      });
  };

  return (
    <SocialLoginForm
      googleLogin={googleLogin}
      kakaoLogin={kakaoLogin}
      githubLogin={githubLogin}
    />
  );
}
