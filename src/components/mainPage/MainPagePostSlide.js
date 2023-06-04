import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MainPagePostSlideItem from "./MainPagePostSlideItem";

const PostSlideWindow = styled.div`
  width: 100%;
  height: 55rem;
  overflow: hidden;
`;

const PostSliderBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  left: ${(props) => `${props.left * -75}%`};
  transition: all 0.5s ease-in-out;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function MainPagePostSlide({ data }) {
  const [idx, setIdx] = useState(0);
  const slideRef = useRef();

  useEffect(() => {
    if (idx === 3) {
      setTimeout(() => {
        slideRef.current.style.transition = "0s ";
        setIdx(0);
      }, 500);
    }
    if (idx === 0) {
      setTimeout(() => {
        slideRef.current.style.transition = "all .5s ease-in-out";
      }, 50);
    }
  }, [idx]);

  const nextItem = () => {
    setIdx((prev) => prev + 1);
  };
  const preItem = () => {
    setIdx((prev) => prev - 1);
  };
  return (
    <div>
      <PostSlideWindow>
        <PostSliderBlock left={idx} ref={slideRef}>
          <MainPagePostSlideItem data={data} idx={1} />
          <MainPagePostSlideItem data={data} idx={2} />
          <MainPagePostSlideItem data={data} idx={3} />
          <MainPagePostSlideItem data={data} idx={1} />
          <MainPagePostSlideItem data={data} idx={2} />
        </PostSliderBlock>
      </PostSlideWindow>
      <button onClick={nextItem}>앞</button>
      <p>{idx}</p>
      <button onClick={preItem}>뒤</button>
    </div>
  );
}
