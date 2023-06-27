import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import MainPagePostSlideItem from "./MainPagePostSlideItem";
import useBoolean from "../../Hooks/useBoolean";
import media from "../../lib/style/media";

// 다음 슬라이드로 자동 넘어가는 시간 (ms)
const SLIDE_DELAY = 8000;

const ProgressKeyFrames = keyframes`
  0% {
    width: 0;
    opacity: 0.5;
  }
  100% {
    width: 100%;
    opacity: .8;
  }
`;

const PostSlideWindow = styled.div`
  width: 100%;
  height: 55rem;
  overflow: hidden;
  position: relative;
  #slideProgressBar {
    position: relative;
    top: -3px;
    height: 3px;
    z-index: 500;
    background-color: ${({ theme }) => theme.pointColor};
    opacity: 0;
    animation: ${ProgressKeyFrames} ${SLIDE_DELAY}ms linear;
  }

  ${media.small} {
    height: 40rem;
  }
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

  ${media.medium} {
    left: ${(props) => `${props.left * -100}%`};
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
  ${media.small} {
    padding: 0;
  }
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
  .pauseButton {
    font-size: 0;
    line-height: 0;
    svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

const indicatorList = ["", "", "", "", "", ""];
const DEFAULT_INDEX = 1;
export default function MainPagePostSlide({ data }) {
  const [currentSlide, setCurrentSlide] = useState(DEFAULT_INDEX);
  const [pauseSlide, onTogglePauseSlide] = useBoolean(false);
  const slideRef = useRef();
  const progressbarRef = useRef(null);

  const lastIdx = data.length;

  // 슬라이드 정지 상태가 아니면 5000ms 마다 다음 슬라이드로 전환
  useEffect(() => {
    const interval = setTimeout(() => {
      if (!pauseSlide) {
        if (currentSlide + 1 < lastIdx) {
          setCurrentSlide((prev) => prev + 1);
        } else {
          setCurrentSlide(DEFAULT_INDEX);
        }
      }
    }, SLIDE_DELAY);

    return () => {
      clearTimeout(interval);
    };
  }, [pauseSlide, currentSlide, lastIdx]);

  // 슬라이드 전환 시 애니메이션 초기화
  useEffect(() => {
    if (progressbarRef.current === null) return;
    progressbarRef.current.style.animation = "none";
    void progressbarRef.current.offsetWidth;
    progressbarRef.current.style.animation = null;
  }, [currentSlide]);

  const nextItem = () => {
    if (currentSlide < lastIdx) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      setCurrentSlide(DEFAULT_INDEX);
    }
  };
  const preItem = () => {
    if (currentSlide === DEFAULT_INDEX) {
      setCurrentSlide(lastIdx + 1);
    }
    setCurrentSlide((prev) => prev - 1);
  };

  const pause = () => {
    onTogglePauseSlide();
  };

  return (
    <div>
      <PostSlideWindow>
        <PostSliderBlock left={currentSlide} ref={slideRef}>
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
        {!pauseSlide && <div id='slideProgressBar' ref={progressbarRef}></div>}
      </PostSlideWindow>
      <SlideIndicatorBox>
        <button className='pauseButton' onClick={pause}>
          {pauseSlide ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <path d='M3 22v-20l18 10-18 10z' />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <path d='M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z' />
            </svg>
          )}
        </button>
        {indicatorList.map((i, idx) => (
          <svg
            key={idx + i}
            className={idx + 1 === currentSlide ? "selected" : ""}
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
