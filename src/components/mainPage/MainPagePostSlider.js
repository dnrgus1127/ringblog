import React from "react";
import styled from "styled-components";

const PostSliderBlock = styled.div`
  width: 100%;
  height: 40rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function MainPagePostSlider({ data }) {
  return (
    <PostSliderBlock>
      <img src={data.thumbnailPath} alt='123' />
    </PostSliderBlock>
  );
}
