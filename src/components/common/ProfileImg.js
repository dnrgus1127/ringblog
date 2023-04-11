import React from "react";
import styled, { css } from "styled-components";
import useBoolean from "../../Hooks/useBoolean";
import FullScreenProfile from "./FullScreenProfile";

const ProfilePreview = styled.div`
  border: 2px solid ${({ theme }) => theme.borderColor};
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }

  ${(props) =>
    props.size === "small" &&
    css`
      width: 13rem;
      height: 13rem;
    `}
  ${(props) =>
    props.size === "medium" &&
    css`
      width: 15rem;
      height: 15rem;
    `}
  ${(props) =>
    props.size === "large" &&
    css`
      width: 17rem;
      height: 17rem;
    `}
`;

export default function ProfileImg({ src, size = "medium" }) {
  const [onFullScreen, onToggleFullscreen] = useBoolean(false);
  return (
    <>
      {onFullScreen && (
        <FullScreenProfile src={src} close={onToggleFullscreen} />
      )}
      <ProfilePreview size={size}>
        <img src={src} alt='유저 프로필' onClick={onToggleFullscreen} />
      </ProfilePreview>
    </>
  );
}
