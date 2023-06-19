import React, { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { loginActions } from "../../redux/loginState";
import Loading from "../../components/Loading";
import LoginForm from "../../components/common/Auth/Login/LoginForm";

export default function LoginContainer({ onOff }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [authFail, setAuthFail] = useState(false);
  const [failType, setFailType] = useState(999);

  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation("login", async () => {
    const response = await fetch(`/login`, {
      method: "POST",
      body: JSON.stringify({ userId: id, password: pw }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    // 로그인 실패 시 {authSuccess(bool), failMessage(String)}
    if (!result.authSuccess) {
      setAuthFail(true);
      setFailType(result.failType);
    } else {
      // 로그인 성공 시 {userId(String), username(String)} Object result
      dispatch(loginActions.setLogin(result));
      onOff();
    }
  });

  const login = () => {
    if (id.length === 0 || pw.length === 0) {
      alert(
        `${id.length === 0 ? "아이디" : "비밀번호"}를 빈칸으로 둘 수 없습니다.`
      );
    } else {
      mutate();
    }
  };

  if (isLoading) return <Loading text='로그인 중' />;
  return (
    <LoginForm
      onLogin={login}
      id={id}
      pw={pw}
      setId={setId}
      setPw={setPw}
      authFail={authFail}
      failType={failType}
    />
  );
}
