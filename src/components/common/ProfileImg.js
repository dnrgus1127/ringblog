import React from "react";
import styled from "styled-components";
import media from "../../lib/style/media";

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
  }
  ${media.small} {
    width: 50vw;
    height: 50vw;
  }
`;
export default function ProfileImg({ src }) {
  return (
    <ProfilePreview>
      {" "}
      <img src={src} alt='유저 프로필' />
    </ProfilePreview>
  );
}
