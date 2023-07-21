import React from "react";
import styled from "styled-components";
import defaultImg from "../../images/blogThum.jpg";
import { onlyDate } from "../../lib/time/dateFormat";
import { Link } from "react-router-dom";
import media from "../../lib/style/media";

const PostItem = styled.div`
  width: 28rem;
  height: 33rem;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 2rem;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.bgElement};
  transition: 0.3s transform ease-in-out;

  &:hover {
    transform: translateY(-1.5rem);
  }
  cursor: pointer;

  .thumbnail {
    width: 100%;
    height: 14rem;
    object-fit: cover;

    //감싸고 있는 div가 텍스트를 위한 공간을 남기는것을 막기 위해서 display block 부여
    display: block;
  }
  .infomation {
    padding: 1.5rem;
    height: 15.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  // 줄바꿈
  .preview {
    display: -webkit-box;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.greyColor};
    height: 8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    margin: 0.5rem 0;
  }
  .date {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.greyColor};
    text-align: end;
  }

  ${media.large} {
    width: 22rem;
    height: 26rem;
    margin-right: 1rem;

    .thumbnail {
      height: 11rem;
    }
    .infomation {
      height: 12rem;
      padding: 1rem;
    }
    .preview {
      height: 4rem;
      -webkit-line-clamp: 2;
      font-size: 1.2rem;
    }

    .date {
      font-size: 1rem;
    }

    h4 {
      font-size: 1.4rem;
    }
  }

  ${media.medium} {
    width: 100%;
    height: 16rem;
    margin-bottom: 1rem;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    &:hover {
      transform: none;
    }
    .thumbnail {
      display: none;
    }
    .infomation {
      height: 8em;
    }
    .preview {
      height: 4rem;

      -webkit-line-clamp: 2;
    }
    h4 {
      font-size: 1.8rem;
    }
    .date {
      font-size: 1.2rem;
    }
  }
`;

const SubInfomation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 3.5rem;

  p {
    font-size: 1rem;
  }
  p:nth-child(1) {
    color: ${({ theme }) => theme.greyColor};
  }

  ${media.large} {
    height: 3rem;

    p {
      font-size: 1rem;
    }
  }
  ${media.medium} {
    height: 3rem;
  }
`;

export default function SubPostItem({ data }) {
  const thumbnailPath = data.thumbnailPath ? data.thumbnailPath : defaultImg;
  const createDateTime = onlyDate(data.createDateTime);

  return (
    <PostItem>
      <Link to={`/Post?index=${data._id}`}>
        <img
          className='thumbnail'
          src={thumbnailPath}
          alt={`썸네일 : ${data.title}`}
        />
        <div className='infomation'>
          <h4 className='title'>{data.title}</h4>
          <p className='preview'>{data.preview}</p>
          <p className='date'>{createDateTime}</p>
        </div>
        <SubInfomation>
          <p>@{data.writer}</p>
          <p>좋아요 : {data.rcmnd_cnt ? data.rcmnd_cnt : 0}개</p>
          <p>댓글 : {data.comment_cnt ? data.comment_cnt : 0}개</p>
        </SubInfomation>
      </Link>
    </PostItem>
  );
}
