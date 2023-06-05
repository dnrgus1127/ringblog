import React from "react";
import styled from "styled-components";
import Margin from "../common/design/Margin";
const SlideItemBlock = styled.div`
  width: 70%;
  height: 100%;
  position: relative;
  margin-right: 5%;
  flex-shrink: 0;

  img {
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .thumbnailFilter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.55);
    z-index: 444;
  }
`;

const SlideContents = styled.div`
  position: relative;
  z-index: 445;
  padding: 0 4rem;

  .slide-titleAndSeries {
    display: flex;
    gap: 1rem;
    align-items: center;

    h2 {
      color: ${({ theme }) => theme.pointColor};
      cursor: pointer;
    }
  }
`;

export default function MainPagePostSlideItem({ post }) {
  return (
    <SlideItemBlock>
      <div className='thumbnailFilter'></div>
      {post.thumbnailPath && <img src={post.thumbnailPath} alt='thumbNail' />}
      <SlideContents className='slide-contents'>
        <Margin>
          <div className='slide-titleAndSeries'>
            <h1>{post.title}</h1>
            {post.series && <h2>- {post.series.title}</h2>}
          </div>
        </Margin>
        <p>{post.preview}</p>
      </SlideContents>
    </SlideItemBlock>
  );
}
