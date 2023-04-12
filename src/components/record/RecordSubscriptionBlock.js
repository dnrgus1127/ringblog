import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import ProfileImg from "../common/ProfileImg";
import defaultImg from "../../images/thumbnail.jpg";
import Loading from "../Loading";
import SubscriptionPostsSection from "./SubscriptionPostsSection";
import useSubscription from "../../Hooks/Subscribe/useSubscription";
import { Link } from "react-router-dom";
import media from "../../lib/style/media";

const SubscriptionBox = styled.div`
  margin-bottom: 2rem;

  hr {
    height: 1px;
    border: none;
    background-color: ${({ theme }) => theme.borderColor};
    margin: 1rem 0;
  }
`;

const BlogerInfomation = styled.div`
  display: flex;

  .textBox {
    margin-left: 3rem;
    width: 80%;
  }
  .unSubscribe {
    text-decoration: underline;
    color: ${({ theme }) => theme.warning};
    &:hover {
      font-weight: 800;
    }
  }
  .nickName,
  .introdution,
  .totalRcmnd {
    margin-bottom: 1rem;
  }
  .nickName {
    color: ${({ theme }) => theme.btnColor};
  }
  .introdution {
    display: -webkit-box;

    font-size: 1.6rem;
    color: ${({ theme }) => theme.greyColor};
    height: 7rem;

    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .totalRcmnd {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    justify-content: end;
    svg {
      margin-top: 0.2rem;
      margin-left: 0.2rem;
      height: 1.4rem;
      fill: ${({ theme }) => theme.color};
    }
  }

  ${media.small} {
    flex-direction: column;
    align-items: center;

    .textBox {
      margin: 0;
      width: 100%;
    }
    .introdution {
      font-size: 1.4rem;
      height: auto;
      max-height: 6rem;
    }

    .unSubscribe {
      display: none;
    }
  }
`;

const OrderAndTag = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  .orderBtns {
    display: flex;
    margin-right: 3rem;
    border: 1px solid ${({ theme }) => theme.borderColor};
    border-radius: 2px;
    width: 13rem;

    button:nth-child(1) {
      border-right: 1px solid ${({ theme }) => theme.borderColor};
    }
    button {
      width: 50%;
      padding: 0.5rem 1rem;
      font-weight: 800;
    }
    button.selected {
      background-color: ${({ theme }) => theme.bgElement3};
      color: ${({ theme }) => theme.btnColor};
    }
  }

  .hashTag {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.greyColor};
  }

  ${media.small} {
    flex-direction: column-reverse;
    .orderBtns {
      margin: 0;
    }
  }
`;

export default function RecordSubscriptionBlock({ userId }) {
  const [order, setOrder] = useState(0);
  const { data, isLoading } = useQuery(
    ["getProfileImg", userId],
    async () => {
      const response = await fetch(`/setting/userProfile?userId=${userId}`);
      return await response.json();
    },
    {
      staleTime: 60000,
    }
  );

  const totalRcmnd = useQuery(
    ["totlRcmnd", userId],
    async () => {
      const response = await fetch(`/rcmnd/usersTotalRcmnd?userId=${userId}`);
      return response.json();
    },
    {
      staleTime: 60000,
    }
  );

  const { unSubscribe } = useSubscription({ writer: userId });

  if (isLoading) return <Loading />;
  return (
    <SubscriptionBox>
      <BlogerInfomation>
        <ProfileImg
          src={data.profileImg ? data.profileImg : defaultImg}
          size='small'
        />
        <div className='textBox'>
          <div className='flex-between'>
            <Link to={`/UserBlog?writer=${data.userId}`}>
              <h2 className='nickName'>{data.nickName}</h2>
            </Link>
            <button className='unSubscribe' onClick={unSubscribe}>
              이 블로그 구독 취소하기
            </button>
          </div>
          <p className='introdution'>
            {data.introdution}
            {data.introdution.length === 0 && "소개글이 없습니다."}
          </p>
          <p className='totalRcmnd'>
            {!totalRcmnd.isLoading && totalRcmnd.data.totalRcmnd
              ? totalRcmnd.data.totalRcmnd
              : 0}
            <svg
              clipRule='evenodd'
              fillRule='evenodd'
              strokeLinejoin='round'
              strokeMiterlimit='2'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z'
                fillRule='nonzero'
              />
            </svg>
          </p>
        </div>
      </BlogerInfomation>
      <OrderAndTag>
        <div className='orderBtns'>
          <button
            className={order === 0 ? "selected" : null}
            onClick={() => {
              setOrder(0);
            }}
          >
            최근
          </button>
          <button
            className={order === 1 ? "selected" : null}
            onClick={() => {
              setOrder(1);
            }}
          >
            인기
          </button>
        </div>
        <div className='hashTag'>
          #태그 #태그2 #태그3 #좋아요 #인스타그램 #REDUX #REACT #JAVASCRIPT
        </div>
      </OrderAndTag>
      <SubscriptionPostsSection userId={userId} order={order} />
      <hr></hr>
    </SubscriptionBox>
  );
}
