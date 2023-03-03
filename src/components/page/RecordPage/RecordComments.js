import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { relativeDate } from "../../../functions/dateFormat";
import { BtnCss } from "../../Button";
import useCmtLoggedUser from "../../common/Comment/hooks/useCmtLoggedUser";
import Loading from "../../Loading";
import Error from "../../Error/Error";

const Container = styled.div`
  margin-bottom: 1rem;

  .commentBtn {
    text-align: end;
  }
`;
const CommentItem = styled.div`
  background-color: ${({ theme }) => theme.bgElement3};
  border-radius: 4px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ theme }) => theme.bgElement2};
  }
  &:hover .comment {
    font-weight: 800;
  }

  .createDate {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.warning};
  }
  .comment {
    font-size: 1.4rem;
    font-weight: 400;
    margin-bottom: 1rem;
  }
  .title {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.greyColor};
  }
  .title span {
    color: inherit;
  }
  .title span:hover {
    color: ${({ theme }) => theme.btnColor};
  }
`;

const Button = styled(BtnCss)`
  margin: 0;
  margin: 0 0.5rem;
  font-size: 1.2rem;
  padding: 0;
  ${(props) => (props.color ? props.color : null)};
`;

export default function RecordComments() {
  const { loading, data, error } = useCmtLoggedUser();
  if (loading) return <Loading text={"로딩중"} />;
  if (error) return <div>Error</div>;
  if (data) {
    if (data.length === 0) {
      return <Error text={"작성한 댓글이 없습니다."} icon={"💬"} />;
    }
    return (
      <div>
        {data.map((item, idx) => (
          <Item key={idx} item={item} />
        ))}
      </div>
    );
  }
  return <Error text={"로그인이 필요합니다."} />;
}

function Item({ item, idx }) {
  return (
    <Container>
      <Link to={`/Post?index=${item.postId}`}>
        <CommentItem key={idx}>
          <div>
            <p className='comment'>{item.comment}</p>
            <p className='createDate'>{relativeDate(item.createDate)}</p>
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <p className='title'>
                by
                <span> {item.title}</span>
              </p>
              <p className='title'>
                작성자 <span>{item.postWriter}</span>
              </p>
            </div>
          </div>
        </CommentItem>
      </Link>
      <div className='commentBtn'>
        <Button color='green'>수정</Button>
        <Button color='red'>삭제</Button>
      </div>
    </Container>
  );
}
