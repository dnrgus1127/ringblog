import React from "react";

export default function LoginByOauth() {
  const onClickSocialLogin = () => {
    fetch("/oauth/github")
      .then((res) => res.json())
      .then((data) => window.open(data.url, "_blank", "noopener, noreferrer"));
    //https://joshua-dev-story.blogspot.com/2020/12/html-rel-noopener-noreferrer.html - 보안문제로 noopener,noreferrer 사용
  };
  return (
    <div>
      <button onClick={onClickSocialLogin}>버튼</button>
    </div>
  );
}
