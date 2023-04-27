import React from "react";
import styled from "styled-components";

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
  .thumbanilBox {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: ${({ theme }) => theme.bgElement3};
  }
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 640px) {
    img {
      max-height: 29vh;
    }
  }

  p {
    margin: 0;
    width: 5rem;
    height: 1.5rem;
    border-radius: 4px;
    background: ${({ theme }) => theme.bgElement3};
    font-family: inherit;
    font-size: 0.6em;
  }
`;

const ItemInfo = styled.div`
  position: relative;
  top: 0;
  left: 0;
  height: 45%;
  padding: 1.6rem 1.6rem;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10%;
  padding: 0 calc(var(--gap) / 4);
  border-top: 1px solid ${({ theme }) => theme.lineColor};

  .user {
    color: ${({ theme }) => theme.greyColor};
  }

  @media (max-width: 640px) {
    padding: 0 1.6rem;
  }
`;

export default function BlogItemSekeletonList({ count = 4 }) {
  const arr = new Array(count);
  arr.fill(0);
  return arr.map((item, idx) => (
    <ItemWrap key={item + idx}>
      <div className='thumbnail'>
        <div className='thumbanilBox'></div>
      </div>
      <ItemInfo>
        <p></p>
        <p className='madeBy'></p>
      </ItemInfo>
      <UserInfo>
        <p className='user'></p>
        <p></p>
        <p className='review'></p>
      </UserInfo>
    </ItemWrap>
  ));
}
