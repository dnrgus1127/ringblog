import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { onlyDate } from "../../functions/dateFormat";
import blog1 from "../../images/blogThum.jpg";

const ItemWrap = styled.div`
  width: 100%;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.bgElement};
  overflow: hidden;
  font-family: "Noto Sans KR", sans-serif;
  transform: translateY(0);
  transition: transform 0.25s ease-in 0s;

  .thumbnail {
    overflow: hidden;
    width: 100%;
    height: 45%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-8px);
  }

  @media (max-width: 640px) {
    img {
      max-height: 29vh;
    }
  }
`;

const ItemInfo = styled.div`
  position: relative;
  top: 0;
  left: 0;
  height: 45%;
  padding: 1.6rem 1.6rem;

  h4 {
    margin: 0;
    margin-bottom: 20px;
    font-family: inherit;
    font-weight: 700;
    font-size: 16px;
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .postPreview {
    display: -webkit-box;
    font-size: 1.4rem;
    font-family: inherit;
    font-weight: 400;

    height: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }

  .madeBy {
    color: ${({ theme }) => theme.greyColor};
    font-size: 1.2rem;
    text-align: right;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 1.6rem;
  }

  @media (max-width: 832px) {
    .postPreview {
      height: 120px;
      -webkit-line-clamp: 6;
    }
  }
  @media (max-width: 640px) {
    .postPreview {
      height: 80px;
      -webkit-line-clamp: 4;
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10%;
  padding: 0 calc(var(--gap) / 4);
  border-top: 1px solid ${({ theme }) => theme.lineColor};

  p {
    margin: 0;
    padding: 0;
    font-family: inherit;
    font-size: 0.6em;
  }
  .user {
    color: ${({ theme }) => theme.greyColor};
  }

  @media (max-width: 640px) {
    padding: 0 1.6rem;
  }
`;

export default function BlogItem({ data }) {
  const createDate = onlyDate(data.createDateTime);
  return (
    <ItemWrap>
      <Link to={`/Post?index=${data._id}`}>
        <div className='thumbnail'>
          <img
            src={data.thumbnailPath ? data.thumbnailPath : blog1}
            alt={"썸네일"}
          ></img>
        </div>
        <ItemInfo>
          <h4>{data.title}</h4>
          <p className='postPreview'>
            {/* // ! null preview null값 처리 수정 필요 */}
            {data.preview !== "null" ? data.preview : "미리보기가 없습니다."}
          </p>
          <p className='madeBy'>{createDate}</p>
        </ItemInfo>
        <UserInfo>
          <p className='user'>@{data.writer}</p>
          <p>좋아요 : {data.rcmnd_cnt ? data.rcmnd_cnt : 0}개</p>
          <p className='review'>
            댓글 : {data.comment_cnt ? data.comment_cnt : 0}개
          </p>
        </UserInfo>
      </Link>
    </ItemWrap>
  );
}
