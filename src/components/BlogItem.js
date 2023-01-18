import React from "react";
import styled from "styled-components";
import blog1 from "../images/blogThum.jpg";
import blog2 from "../images/썸네일2.png";

const ItemWrap = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: var(--black2);
  overflow: hidden;
  font-family: "Noto Sans KR", sans-serif;

  .thumbnail {
    overflow: hidden;
    width: 100%;
    height: 45%;
  }
  img {
    width: 100%;
    height: 100%;
    transform: scale(1.1);
  }
`;

const ItemInfo = styled.div`
  height: 45%;
  padding: 1.6rem 1.6rem;

  h4 {
    margin: 0;
    margin-bottom: 20px;
    font-family: inherit;
    font-weight: 700;
    font-size: 16px;
  }

  .postPreview {
    font-size: 1.4rem;
    font-family: inherit;
    font-weight: 400;
  }

  .madeBy {
    color: lightgrey;
    font-size: 1.2rem;
    text-align: right;
  }
`;
const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10%;
  padding: 0 calc(var(--gap) / 4);
  border-top: 1px solid var(--bg-menu);

  p {
    margin: 0;
    padding: 0;
    font-family: inherit;
    font-size: 0.6em;
  }
  .user {
    color: grey;
  }
  .review {
  }
`;
export default function BlogItem({ idx, data }) {
  const date = new Date(data.createDateTime);
  const createDate = `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
  return (
    <ItemWrap>
      <div className='thumbnail'>
        <img src={idx % 2 === 0 ? blog1 : blog2} alt='썸네일' />
      </div>
      <ItemInfo>
        <h4>{data.title}</h4>
        <p className='postPreview'>{data.preview}</p>
        <p className='madeBy'>{createDate}</p>
      </ItemInfo>
      <UserInfo>
        <p className='user'>@{data.writer}</p>
        <p className='review'>댓글 : 0개</p>
      </UserInfo>
    </ItemWrap>
  );
}
