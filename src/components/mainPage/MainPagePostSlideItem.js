import React from "react";
import styled from "styled-components";
import Margin from "../common/design/Margin";
import { Link } from "react-router-dom";
import media from "../../lib/style/media";
const SlideItemBlock = styled.div`
  width: 70%;
  height: 100%;
  position: relative;
  margin-right: 5%;
  flex-shrink: 0;

  .backgroundImg {
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
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 444;
  }

  & > a {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  ${media.medium} {
    width: 100%;
    margin-right: 0;
  }
`;

const SlideContents = styled.div`
  position: relative;
  width: 100%;
  z-index: 445;
  padding: 2rem 4rem;
  height: 100%;

  h1,
  h2,
  p {
    color: white;
  }

  .slide-seriesTitle {
    color: ${({ theme }) => theme.pointColor};
    cursor: pointer;
  }

  ${media.medium} {
    padding: 1rem 2rem;
    h1 {
      font-size: 2rem;
    }
    h2 {
      font-size: 1.8rem;
    }
    p {
      font-size: 1.6rem;
    }
  }
`;

const UserName = styled.div`
  position: absolute;

  bottom: 2rem;
  right: 2rem;
  text-align: end;
  color: ${({ theme }) => theme.greyColor};
`;

export default function MainPagePostSlideItem({ post }) {
  return (
    <SlideItemBlock>
      <Link to={`/post?index=${post._id}`}>
        <div className='thumbnailFilter'></div>
        {post.thumbnailPath && (
          <img
            className='backgroundImg'
            src={post.thumbnailPath}
            alt='thumbNail'
            onError={({ target }) => {
              // 무한 루프 방지
              target.onError = "null";
              target.src = "defaultThumb.jpg";
            }}
          />
        )}
        <SlideContents>
          {post.series && (
            <h2 className='slide-seriesTitle'>{post.series.title}</h2>
          )}
          <h1>{post.title}</h1>
          <Margin size='small'>
            <p>{post.preview}</p>
          </Margin>
          <UserName>@{post.writer}</UserName>
        </SlideContents>
      </Link>
    </SlideItemBlock>
  );
}
