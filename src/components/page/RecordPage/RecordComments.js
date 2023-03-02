import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Context } from "../../../functions/Login/LoginProvider";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { relativeDate } from "../../../functions/dateFormat";
import { BtnCss } from "../../Button";

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

  .createDate {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.warning};
  }
  .comment {
    font-size: 1.4rem;
    font-weight: 400;
    margin-bottom: 1rem;
  }
  .comment:hover {
    font-weight: 800;
    border-bottom: 1px solid ${({ theme }) => theme.greyColor};
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

  &:hover {
    background-color: ${({ theme }) => theme.bgElement2};
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
  const { loggedIn, loggedUser } = useContext(Context);
  const [data, setData] = useState([{ title: "123" }]);

  useEffect(() => {
    fetch(`/allCommentByUser?userId=${loggedUser.userId}`)
      .then((res) => res.json())
      .then((result) => setData(result));
  }, [loggedUser]);

  return (
    <div>
      {loggedIn && data.map((item, idx) => <Item key={idx} item={item} />)}
    </div>
  );
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
              <Link to={`/Post?index=${item.postId}`}>
                <p className='title'>
                  by
                  <span> {item.title}</span>
                </p>
              </Link>
              <Link to={`/userBlog?writer=${item.postWriter}`}>
                <p className='title'>
                  작성자 <span>{item.postWriter}</span>
                </p>
              </Link>
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
