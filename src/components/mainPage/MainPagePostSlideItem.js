import React from "react";
import styled from "styled-components";
import Margin from "../common/design/Margin";
import { Link } from "react-router-dom";
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
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 444;
  }
`;

const SlideContents = styled.div`
  position: relative;
  z-index: 445;
  padding: 0 4rem;
  height: 100%;
  h1,
  h2,
  p {
    color: white;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }

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

const UserBox = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 30rem;

  padding: 2rem;
  .profile {
    display: inline-block;
    width: 15rem;
    height: 15rem;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }
  img {
    width: 100%;
    height: 100%;
  }
  h2 {
    width: 15rem;
    text-align: center;
  }
  p {
    width: 50%;
    height: 5rem;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
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
          <Margin>
            <div className='slide-titleAndSeries'>
              <h1>{post.title}</h1>
              {post.series && <h2>- {post.series.title}</h2>}
            </div>
          </Margin>
          <p>{post.preview}</p>
          <UserBox>
            <div className='profile'>
              <img src={post.writerInfo.profileImg} alt='프로필 이미지' />
            </div>
            <h2>{post.writerInfo.name}</h2>
            <p>{post.writerInfo.introdution}</p>
          </UserBox>
        </SlideContents>
      </Link>
    </SlideItemBlock>
  );
}
