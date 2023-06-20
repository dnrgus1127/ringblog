import React, { useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import media from "../../lib/style/media";
import defaultProfileImg from "../../images/thumbnail.jpg";
import ProfileImg from "../common/ProfileImg";
import useAlert from "../../Hooks/common/useAlert";

const ProfileBox = styled.div`
  position: relative;

  .selectBtn {
    position: absolute;
    top: 11.5rem;
    left: 0;
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 4px;
    width: 9rem;
    height: 3rem;
    background-color: ${({ theme }) => theme.bgElement};
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 0.4rem;
  }
  .delProfile {
    font-size: 1.1rem;
    width: 100%;
    color: ${({ theme }) => theme.warning};
    cursor: pointer;
  }

  svg {
    height: 70%;
    fill: ${({ theme }) => theme.color};
  }
  ${media.small} {
    margin: 0 auto;

    button {
      position: static;
      margin: 0 auto;
      margin-top: 1rem;
    }
  }
`;

//프로필 이미지 셀렉터

export default function ProfileImgSelector({ initImg }) {
  const [defaultImg, setDefulatImge] = useState(
    initImg ? initImg : defaultProfileImg
  );
  const { loggedUser } = useSelector((state) => state.login);
  const [profile, setProfile] = useState();
  const fileSelector = useRef();
  const { onToggleAlert } = useAlert();

  const fileOnChange = (e) => {
    const file = e.target.files[0];
    setProfile(file);
    uploadImg(file);
  };

  const fileChangeDefault = (e) => {
    setProfile(null);
    setDefulatImge(defaultProfileImg);
    uploadImg(null);
  };

  async function uploadImg(file) {
    const formData = new FormData();
    formData.append("img", file);
    const response = await fetch(
      `setting/profileImgUpload?userId=${loggedUser.userId}`,
      {
        method: "post",
        body: formData,
      }
    );
    const result = await response.json();

    if (result.success) {
      onToggleAlert("이미지 수정 완료");
    } else {
      onToggleAlert("이미지 수정 실패", true);
    }
    return;
  }
  return (
    <ProfileBox>
      <ProfileImg src={profile ? URL.createObjectURL(profile) : defaultImg} />
      <button
        className='selectBtn'
        onClick={() => {
          fileSelector.current.click();
        }}
      >
        <svg
          clipRule='evenodd'
          fillRule='evenodd'
          strokeLinejoin='round'
          strokeMiterlimit='2'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.749c0-.414.336-.75.75-.75s.75.336.75.75v9.249c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm1.521 9.689 9.012-9.012c.133-.133.217-.329.217-.532 0-.179-.065-.363-.218-.515l-2.423-2.415c-.143-.143-.333-.215-.522-.215s-.378.072-.523.215l-9.027 8.996c-.442 1.371-1.158 3.586-1.264 3.952-.126.433.198.834.572.834.41 0 .696-.099 4.176-1.308zm-2.258-2.392 1.17 1.171c-.704.232-1.274.418-1.729.566zm.968-1.154 7.356-7.331 1.347 1.342-7.346 7.347z'
            fillRule='nonzero'
          />
        </svg>
        찾아보기
      </button>
      <button className='delProfile' onClick={fileChangeDefault}>
        이미지 기본값으로 돌리기
      </button>

      <input
        type='file'
        hidden
        accept='image/*'
        onChange={fileOnChange}
        ref={fileSelector}
      />
    </ProfileBox>
  );
}
