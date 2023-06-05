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
  const [idx, setIdx] = useState(1);
  const slideRef = useRef();
  const lastIdx = data.length;
  const startIdx = 1;

  // 무한 슬라이딩 가능하도록
  useEffect(() => {
    if (idx === lastIdx + 1) {
      setTimeout(() => {
        slideRef.current.style.transition = "0s ";
        setIdx(startIdx);
      }, 500);
    }
    if (idx === startIdx || idx === lastIdx) {
      setTimeout(() => {
        slideRef.current.style.transition = "all .5s ease-in-out";
      }, 50);
    }
    if (idx === startIdx - 1) {
      setTimeout(() => {
        slideRef.current.style.transition = "0s";
        setIdx(lastIdx);
      }, 500);
    }
  }, [idx, lastIdx]);

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
          <MainPagePostSlideItem post={data[lastIdx - 1]} />
          {data.map((item, idx) => (
            <MainPagePostSlideItem post={item} key={item._id} />
          ))}
          {data.map(
            (item, idx) =>
              idx < 3 && (
                <MainPagePostSlideItem post={item} key={item._id + 32} />
              )
          )}
        </PostSliderBlock>
      </PostSlideWindow>
      <button onClick={nextItem}>앞</button>
      <p>{idx}</p>
      <button onClick={preItem}>뒤</button>
    </div>
  );
}
