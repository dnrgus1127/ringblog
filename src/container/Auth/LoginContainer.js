import React, { useState } from "react";
import Loading from "../../components/Loading";
import LoginForm from "../../components/common/Auth/Login/LoginForm";
import useAuth from "../../Hooks/Login/useAuth";

export default function LoginContainer({ onOff }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const { login, isLoadingLogin, isFailAuth, failType } = useAuth();

  if (isLoadingLogin) return <Loading text='로그인 중' />;
  return (
    <LoginForm
      onLogin={async () => {
        const result = await login({
          userId: id,
          password: pw,
        });
        if (result) {
          onOff();
        }
      }}
      id={id}
      pw={pw}
      setId={setId}
      setPw={setPw}
      authFail={isFailAuth}
      failType={failType}
      disabledLogin={id.length === 0 || pw.length === 0}
    />
  );
}
