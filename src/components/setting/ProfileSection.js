import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { SettingButton } from "../common/Button";
import Loading from "../Loading";
import SettingSectionTemplate from "./SettingSectionTemplate";

export default function ProfileSection() {
  const [nickName, setNickName] = useState("");
  const [introdution, setIntrodution] = useState("");
  const { loggedUser } = useSelector((state) => state.login);

  // 서버 profile 불러오기
  const queryProfile = useQuery(
    ["profileSetting", loggedUser.userId],
    async () => {
      const response = await fetch(
        `setting/userProfile?userId=${loggedUser.userId}`
      );
      return await response.json();
    }
  );
  useEffect(() => {
    if (queryProfile.data) {
      setNickName(queryProfile.data.nickName);
      setIntrodution(queryProfile.data.introdution);
    }
  }, [queryProfile.data]);

  const updateProfile = useMutation("updateProfile", async () => {
    const response = await fetch("/setting/updateProfile", {
      method: "POST",
      body: JSON.stringify({
        userId: loggedUser.userId,
        nickName: nickName,
        introdution: introdution,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();

    if (result.success) {
      alert("수정 성공!");
    } else {
      alert("수정 실패");
    }
  });

  const onUpdate = () => {
    updateProfile.mutate();
  };

  if (queryProfile.isLoading) return <Loading />;

  return (
    <SettingSectionTemplate>
      <h3>프로필 수정</h3>
      <h4>닉네임</h4>
      <input
        type='text'
        value={nickName}
        onChange={(e) => {
          setNickName(e.target.value);
        }}
      />
      <p>
        새로운 닉네임을 입력하여, 자신만의 독특한 아이덴티티를 만들어보세요.
      </p>
      <h4>소개글</h4>
      <textarea
        name=''
        id=''
        cols='30'
        rows='10'
        value={introdution}
        onChange={(e) => {
          setIntrodution(e.target.value);
        }}
      ></textarea>
      <p>블로그를 소개할 간단한 문구를 작성해주세요!</p>
      <div className='btnWrap'>
        <SettingButton size='small' onClick={onUpdate}>
          수정하기
        </SettingButton>
      </div>
    </SettingSectionTemplate>
  );
}
