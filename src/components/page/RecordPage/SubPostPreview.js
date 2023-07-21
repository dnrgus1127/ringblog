import React from "react";
import useSubPost from "./hook/useSubPost";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { onlyDate } from "../../../lib/dateFormat";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  .allWrap {
    display: none;
  }

  @media (max-width: 832px) {
    display: block;
    .allWrap {
      display: flex;
      justify-content: end;
      width: 100%;
      margin-bottom: 0.5rem;
    }
  }
`;

const Item = styled.div`
  width: 24.5%;
  background-color: ${({ theme }) => theme.bgElement3};
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);

  .title {
    font-size: 1.6rem;
  }

  .preview {
    color: ${({ theme }) => theme.greyColor};
    font-size: 1.2rem;
    height: 10rem;
    overflow: hidden;

    //디테일 수정 필요
  }
  .createDate {
    text-align: end;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.greyColor};
  }

  @media (max-width: 832px) {
    width: 100%;
    margin-bottom: 2rem;
  }
`;

const All = styled.button`
  font-size: 1.4rem;
  font-weight: 600;
`;

export default function SubPostPreview({ user }) {
  const { data } = useSubPost(user);

  const post = (item, idx) => (
    <Item key={idx}>
      <Link to={`/Post?index=${item._id}`}>
        <p className='title'>{item.title}</p>
        <p className='preview'>{item.preview}</p>
        <p className='createDate'>{onlyDate(item.createDateTime)}</p>
      </Link>
    </Item>
    // <BlogItem data={item} idx={idx} key={idx} />
  );

  return (
    <Container>
      <div className='allWrap'>
        <All>전체보기</All>
      </div>
      {data.map((item, idx) => {
        if (idx < 4) {
          return post(item, idx);
        } else {
          return null;
        }
      })}
    </Container>
  );
}
