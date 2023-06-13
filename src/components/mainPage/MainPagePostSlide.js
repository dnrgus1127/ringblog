import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import MainPagePostSlideItem from "./MainPagePostSlideItem";

const PostSlideWindow = styled.div`
  width: 100%;
  height: 55rem;
  overflow: hidden;
  position: relative;
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

const BtnBlock = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`;

const SlideBtn = styled.button`
  svg {
    fill: white;
    filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5));

    width: 3rem;
    height: 3rem;
  }
  z-index: 500;
`;
const SlideIndicatorBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  gap: 3px;
  svg {
    width: 1.5rem;
    height: 1.5rem;
    fill: ${({ theme }) => theme.pointColor};
  }
  circle {
    display: none;
  }
  svg.selected {
    circle {
      display: initial;
    }
  }
`;

const indicatorList = ["", "", "", "", "", ""];

export default function MainPagePostSlide({ data }) {
  const [index, setSlideIndex] = useState(1);
  const slideRef = useRef();

  const lastIdx = data.length;
  const startIdx = 1;

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => prev + 1);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // 무한 슬라이딩 가능하도록
  useEffect(() => {
    if (index === lastIdx + 1) {
      setTimeout(() => {
        slideRef.current.style.transition = "0s ";
        setSlideIndex(startIdx);
      }, 500);
    }
    if (index === startIdx || index === lastIdx) {
      setTimeout(() => {
        slideRef.current.style.transition = "all .5s ease-in-out";
      }, 50);
    }
    if (index === startIdx - 1) {
      setTimeout(() => {
        slideRef.current.style.transition = "0s";
        setSlideIndex(lastIdx);
      }, 500);
    }
  }, [index, lastIdx]);

  const nextItem = () => {
    setSlideIndex((prev) => prev + 1);
  };
  const preItem = () => {
    setSlideIndex((prev) => prev - 1);
  };

  return (
    <div>
      <PostSlideWindow>
        <PostSliderBlock left={index} ref={slideRef}>
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
        <BtnBlock>
          <SlideBtn onClick={preItem}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
            </svg>
          </SlideBtn>
          <SlideBtn onClick={nextItem}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <path d='M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z' />
            </svg>
          </SlideBtn>
        </BtnBlock>
      </PostSlideWindow>
      <SlideIndicatorBox>
        {indicatorList.map((i, idx) => (
          <svg
            key={idx + i}
            className={idx + 1 === index ? "selected" : ""}
            clipRule='evenodd'
            fillRule='evenodd'
            strokeLinejoin='round'
            strokeMiterlimit='2'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='m11.998 2c5.517 0 9.997 4.48 9.997 9.998 0 5.517-4.48 9.997-9.997 9.997-5.518 0-9.998-4.48-9.998-9.997 0-5.518 4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 8.498s3.808 8.497 8.498 8.497 8.497-3.807 8.497-8.497-3.807-8.498-8.497-8.498z'
              fillRule='nonzero'
            />
            <circle cx='11.998' cy='11.998' fillRule='nonzero' r='9.998' />
          </svg>
        ))}
      </SlideIndicatorBox>
    </div>
  );
}
