import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { onlyDate } from "../../functions/dateFormat";

const Container = styled.div`
  img {
    width: 100%;
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
    height: 1px;
  }
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
  }

  .subInfo {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.greyColor};
    display: flex;
    justify-content: end;
  }
`;

export default function PostCard({ item }) {
  const date = onlyDate(item.createDateTime);
  return (
    <Link to={`/Post?index=${item._id}`}>
      <Container>
        {item.thumbnailPath !== "null" ? (
          <div className='thumbnail'>
            <img alt='썸네일' src={item.thumbnailPath} />
          </div>
        ) : null}
        <TitleBox>
          <h2>{item.title}</h2>
          <p className='preview'>{item.preview}</p>
          <div className='subInfo'>
            <p>{date}</p>
          </div>
        </TitleBox>

        <hr />
      </Container>
    </Link>
  );
}
