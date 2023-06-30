import React from "react";
import SettingSectionTemplate from "../../components/setting/SettingSectionTemplate";
import { RedButton } from "../../components/common/button/Button";

export default function DeleteAccount() {
  const deleteAccount = async () => {
    const res = await fetch("/account/delete", {
      method: "POST",
    });
    if (res.status === 200) {
      window.alert("회원탈퇴 되었습니다.");
    } else {
      window.alert("오류 발생 : " + res.status);
    }
    window.location.reload();
  };
  return (
    <SettingSectionTemplate>
      <h3>계정 삭제</h3>
      <RedButton size='small' onClick={deleteAccount}>
        계정 삭제
      </RedButton>
    </SettingSectionTemplate>
  );
}
