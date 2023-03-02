import React from "react";
import useSubPost from "./hook/useSubPost";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { onlyDate } from "../../../functions/dateFormat";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Item = styled.div`
  width: 21.5%;
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
`;

const More = styled(Item)`
  width: 10%;
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
  );

  return (
    <Container>
      {data.map((item, idx) => {
        if (idx < 4) {
          return post(item, idx);
        } else {
          return null;
        }
      })}
      {data.length > 4 ? <More>더보기...</More> : null}
    </Container>
  );
}
