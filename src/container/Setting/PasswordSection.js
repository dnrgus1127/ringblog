import React, { useEffect, useRef, useState } from "react";
import SettingSectionTemplate from "../../components/setting/SettingSectionTemplate";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useMutation } from "react-query";
import useAuth from "../../Hooks/login/useAuth";
import { BarButton } from "../../components/common/button/Button";
import { checkPassword } from "../../lib/valid/AccountValidation";
import media from "../../lib/style/media";

const PasswordForm = styled.form`
  padding-left: 1rem;

  label {
    display: block;
    margin-bottom: 0.4rem;
  }
  input {
    width: 50%;
    display: block;
    font-size: 1.4rem;
  }
  .passwordValid {
    color: ${({ theme }) => theme.warning};
  }

  ${media.small} {
    input {
      width: 100%;
    }
  }
`;

export default function PasswordSection() {
  const { loggedUser } = useSelector((state) => state.login);
  const currentPasswordRef = useRef(null);

  const [newPassword, setNewPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [checkMessage, setCheckMessage] = useState();

  const { logout } = useAuth();

  const { mutate } = useMutation(async ({ current, newPassword }) => {
    const res = await fetch("/account/password/change", {
      method: "POST",
      body: JSON.stringify({
        currentPassword: current,
        newPassword: newPassword,
        userId: loggedUser.userId,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 403) {
      alert("현재 비밀번호가 일치하지 않습니다.");
      currentPasswordRef.current.value = "";
      currentPasswordRef.current.focus();
    } else if (res.status === 200) {
      alert(
        "비밀번호가 변경되었습니다. 변경된 비밀번호로 다시 로그인해 주세요!"
      );
      logout();
      window.location.reload();
    }
    return res.status;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentPassword = e.target[0].value;

    if (checkMessage.isCheck) {
      alert(checkMessage.message);
    }

    mutate({
      current: currentPassword,
      newPassword: newPassword,
    });
  };

  useEffect(() => {
    checkPassword(newPassword, setCheckMessage);

    if (newPassword !== validPassword) {
      setCheckMessage({
        isCheck: true,
        message: "새 비밀번호가 일치하지 않습니다.",
      });
    }
  }, [newPassword, validPassword]);
  return (
    <SettingSectionTemplate>
      <h2>비밀번호</h2>
      <h3>비밀번호 변경</h3>
      <PasswordForm onSubmit={handleSubmit}>
        <label htmlFor='currentPw'>현재 비밀번호</label>
        <input
          ref={currentPasswordRef}
          type='password'
          name='currentPw'
          placeholder='비밀번호를 입력하세요.'
        />
        <label htmlFor='newPassword'>새 비밀번호</label>
        <input
          type='password'
          name='newPassword'
          id=''
          placeholder='새 비밀번호를 입력하세요.'
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
        <label htmlFor='checkNewPassword'>새 비밀번호 확인</label>
        <input
          type='password'
          name='checkNewPassword'
          id=''
          placeholder='새 비밀번호를 한번 더 입력하세요.'
          value={validPassword}
          onChange={(e) => {
            setValidPassword(e.target.value);
          }}
        />
        <p className='passwordValid'>{checkMessage && checkMessage.message}</p>

        <BarButton
          type='submit'
          disabled={checkMessage && checkMessage.isCheck}
          style={{ display: "block", margin: "0 auto" }}
        >
          비밀번호 변경
        </BarButton>
      </PasswordForm>
    </SettingSectionTemplate>
  );
}
