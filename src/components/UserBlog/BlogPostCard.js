import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { onlyDate } from "../../lib/dateFormat";

const Container = styled.div`
  img {
    width: 100%;
    object-fit: cover;
    max-height: 40vh;
  }
  .thumbnail {
    border: 0.5px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 2rem;
  }

  hr {
    margin-top: 1rem;
    margin-bottom: 4rem;
    border: 0;
    background-color: lightgrey;
    height: ${({ theme }) => (theme.color === "white" ? "1px" : "0px")};
  }

  box-shadow: 2px 2px 5px
    ${({ theme }) => (theme.color === "black" ? "rgba(0, 0, 0, 0.2)" : "null")};
`;

const TitleBox = styled.div`
  padding: 1rem 2rem;

  h2 {
    margin-bottom: 2rem;
  }

  .preview {
    font-size: 1.4rem;
    font-weight: 400;
    color: ${({ theme }) => theme.greyColor};
    margin-bottom: 4rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .subInfo {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.greyColor};
    display: flex;
    justify-content: space-between;
  }
  .rcmndCount {
    display: flex;
    align-items: center;
    height: 3rem;
    width: 3rem;
    justify-content: space-between;

    path {
      fill: currentColor;
    }
  }
  .permission {
    background-color: ${({ theme }) => theme.btnColor};
    color: ${({ theme }) => theme.oppositeColor};
    font-weight: 800;
    padding: 0.2rem 1rem;
    border-radius: 2px;
  }
`;

export default function BlogPostCard({ item }) {
  const date = onlyDate(item.createDateTime);
  return (
    <Link to={`/Post?index=${item._id}`}>
      <Container>
        {item.thumbnailPath && (
          <div className='thumbnail'>
            <img alt='썸네일' src={item.thumbnailPath} />
          </div>
        )}
        <TitleBox>
          <div className='flex-between'>
            <h2>{item.title}</h2>
            {!item.permission && <p className='permission'> 비공개</p>}
          </div>
          <p className='preview'>{item.preview}</p>
          <div className='subInfo'>
            <div className='rcmndCount'>
              <svg width='1.7rem' height='1.7rem' viewBox='0 0 24 24'>
                <path d='M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z'></path>
              </svg>
              <p>{item.rcmnd_cnt}</p>
            </div>
            <p>{date}</p>
          </div>
        </TitleBox>

        <hr />
      </Container>
    </Link>
  );
}
