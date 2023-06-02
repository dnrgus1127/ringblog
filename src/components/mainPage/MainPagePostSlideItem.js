import React from "react";
import styled from "styled-components";

const SlideItemBlock = styled.div`
  width: 70%;
  height: 100%;
  background-color: red;
  position: relative;
  margin-right: 5%;
  flex-shrink: 0;
`;

export default function MainPagePostSlideItem({ idx }) {
  return <SlideItemBlock>MainPagePostSliderItem{idx}</SlideItemBlock>;
}
