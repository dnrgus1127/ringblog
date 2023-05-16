import React from "react";
import styled from "styled-components";

const ThumbnailBlock = styled.div`
  width: 100%;
  max-height: 40rem;
  overflow: hidden;
`;
const ThumbnailImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export default function PostThumbnail({ src, className }) {
  if (src === "null" || src === "undefined") return;
  return (
    <ThumbnailBlock className={className}>
      <ThumbnailImg src={src} />
    </ThumbnailBlock>
  );
}
