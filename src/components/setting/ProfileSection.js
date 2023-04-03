import React from "react";
import SettingSectionTemplate from "./SettingSectionTemplate";

export default function ProfileSection() {
  return (
    <SettingSectionTemplate>
      <h2>프로필 수정</h2>
      <h3>닉네임</h3>
      <input type='text' />
      <p>설명주저리주저리</p>
      <h3>소개글</h3>
      <textarea name='' id='' cols='30' rows='10'></textarea>
      <p>주저리 주저리</p>
    </SettingSectionTemplate>
  );
}
