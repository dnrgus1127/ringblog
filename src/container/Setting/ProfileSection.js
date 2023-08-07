import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import { loginActions } from "../../store/loginState";
import ProfileImgSelector from "../../components/setting/ProfileImgSelector";
import { checkName } from "../../lib/valid/AccountValidation";
import media from "../../lib/style/media";
import { BarButton } from "../../components/common/button/Button";
import Loading from "../../components/common/Loading";
import StringLength from "../../components/WritePosts/StringLength";
import useAlert from "../../Hooks/common/useAlert";
import SettingSectionTemplate from "../../components/setting/SettingSectionTemplate";

const NickNameAndImg = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-right: 8rem;
  .nickName {
    width: 60%;
  }

  ${media.small} {
    flex-direction: column;
    padding: 0;
    .nickName {
      width: 100%;
    }
    & > :nth-child(2) {
      order: -1;
    }
  }
`;
const IntroHeadAndLength = styled.div`
  width: 80%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  h4,
  div {
    display: inline-block;
  }
  ${media.small} {
    .introHeadAndLength {
      width: 100%;
    }
  }
`;

const namePlaceholder =
  "이름(닉네임)은 한글, 영어, 숫자만 사용하여 2~10자 이내로 작성할 수 있습니다.";
const introPlaceholder = "블로그에 대한 설명을 작성해 주세요 (최대 500자)";

export default function ProfileSection() {
  const [nickName, setNickName] = useState("");
  const [nickNameError, setNickNameError] = useState({
    isCheck: false,
    message: "",
  });
  const [introdution, setIntrodution] = useState("");
  const [introdutionCheck, setIntrodutionCheck] = useState(false);
  const { loggedUser } = useSelector((state) => state.login);
  const { onToggleAlert } = useAlert();
  const dispatch = useDispatch();

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
      setNickName(queryProfile.data.name);
      setIntrodution(queryProfile.data.introdution);
    }
  }, [queryProfile.data]);

  // 프로필 업데이트
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
      dispatch(loginActions.setLoggedUser(nickName));
      onToggleAlert("프로필 수정 성공!");
    } else {
      onToggleAlert("프로필 수정 실패", true);
    }
  });

  const onUpdate = () => {
    updateProfile.mutate();
  };

  const clearEntered = () => {
    setNickName(queryProfile.data.nickName);
    setIntrodution(queryProfile.data.introdution);
    setNickNameError(false);
  };

  if (queryProfile.isLoading) return <Loading />;

  return (
    <SettingSectionTemplate>
      <h2>프로필</h2>
      <h3>프로필 수정</h3>
      <NickNameAndImg>
        <div className='nickName'>
          <h4>닉네임</h4>
          <input
            type='text'
            placeholder={namePlaceholder}
            value={nickName}
            onChange={(e) => {
              setNickName(e.target.value);
            }}
            onBlur={() => {
              if (nickName !== queryProfile.data.nickName) {
                checkName(nickName, setNickNameError);
              } else {
                setNickNameError({ isCheck: false });
              }
            }}
          />
          <p>
            새로운 닉네임을 입력하여, 자신만의 독특한 아이덴티티를 만들어보세요.
          </p>
        </div>
        <ProfileImgSelector initImg={queryProfile.data.profileImg} />
      </NickNameAndImg>
      {nickNameError.isCheck && (
        <p className='errorMsg'>{nickNameError.message}</p>
      )}

      <IntroHeadAndLength>
        <h4>소개글</h4>
        <StringLength
          string={introdution}
          maxLength={500}
          overLimit={(bool) => {
            setIntrodutionCheck(bool);
          }}
          size={"small"}
        />
      </IntroHeadAndLength>
      <textarea
        name=''
        id=''
        cols='30'
        rows='10'
        placeholder={introPlaceholder}
        value={introdution}
        onChange={(e) => {
          setIntrodution(e.target.value);
        }}
      ></textarea>
      <p>블로그를 소개할 간단한 문구를 작성해주세요!</p>
      <div className='btnWrap' style={{ display: "flex", gap: "1rem" }}>
        <BarButton
          size='small'
          onClick={onUpdate}
          disabled={nickNameError.isCheck || introdutionCheck}
        >
          수정하기
        </BarButton>
        <BarButton
          size='small'
          onClick={clearEntered}
          style={{ backgroundColor: "rgba(217, 73, 79)" }}
        >
          초기화
        </BarButton>
      </div>
    </SettingSectionTemplate>
  );
}
