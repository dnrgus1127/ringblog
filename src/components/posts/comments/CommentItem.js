import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { relativeDate } from "../../../functions/dateFormat";
import useBoolean from "../../../Hooks/useBoolean";
import { BtnCss } from "../../Button";
import MdfdComment from "./MdfdComment";

const Container = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.greyColor};

  margin: 1rem 0;
  padding: 1rem 0;
  padding-bottom: 2rem; ;
`;

const Comment = styled.div`
  margin: 1rem 0;
  display: flex;
  font-size: 1.5rem;

  svg {
    width: 3rem;
    height: 3rem;
    fill: ${({ theme }) => theme.color};
  }
`;

const CommentInfo = styled.div`
  font-weight: 800;
  font-size: 1.4rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;

  justify-content: space-between;
  p {
    margin-right: 0.5rem;
  }
  .date {
    font-size: 1rem;
    color: ${({ theme }) => theme.greyColor};
  }
  .mdfd {
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.btnColor};
  }

  .writerAndDate {
    display: flex;
    align-items: center;
  }
`;

const Btn = styled(BtnCss)`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.color};
  margin: 0;
  margin-right: 1rem;
  padding: 0;

  &:nth-child(1):hover {
    color: green;
  }
  &:nth-child(2):hover {
    color: red;
  }
`;
// icon
const open = (
  <svg
    width='24'
    height='24'
    xmlns='http://www.w3.org/2000/svg'
    fillRule='evenodd'
    clipRule='evenodd'
  >
    <path d='M24 1v16.981h-13l-7 5.02v-5.02h-4v-16.981h24zm-6 5.285l-6.622 7.715-4.378-3.852 1.319-1.489 2.879 2.519 5.327-6.178 1.475 1.285z' />
  </svg>
);
const hideComment = (
  <svg
    width='24'
    height='24'
    xmlns='http://www.w3.org/2000/svg'
    fillRule='evenodd'
    clipRule='evenodd'
  >
    <path d='M3.439 3l-1.439-1.714 1.532-1.286 17.382 20.714-1.533 1.286-2.533-3.019h-5.848l-7 5.02v-5.02h-4v-15.981h3.439zm20.561 15.981h-2.588l-13.41-15.981h15.998v15.981z' />
  </svg>
);

export default function CommentItem({ data, commentsUpdate, onDelete }) {
  const [hide, setHide] = useState(false);

  const { loggedUser } = useSelector((state) => state.login);

  const [mdfd, onToggleMdfd, setMdfd] = useBoolean(false);

  return (
    <Container>
      <CommentInfo>
        <div className='writerAndDate'>
          <p>{data.name}</p>
          <p className='date'>
            {relativeDate(data.mdfd === 0 ? data.createDate : data.mdfdDate)}
          </p>
          <span className='mdfd'>{data.mdfd === 1 ? "(수정됨)" : null}</span>
        </div>

        {loggedUser.userId === data.writer ? (
          <div className='editDel'>
            <Btn
              onClick={() => {
                onToggleMdfd(true);
              }}
            >
              수정
            </Btn>
            <Btn
              onClick={() => {
                setMdfd(false);
                onDelete(data._id);
              }}
            >
              삭제
            </Btn>
          </div>
        ) : null}
      </CommentInfo>

      <Comment className='comment'>
        <button
          onClick={() => {
            hide ? setHide(false) : setHide(true);
          }}
        >
          {hide ? hideComment : open}
        </button>
        {hide ? <p>가려진 댓글입니다.</p> : <p>{data.comment}</p>}
      </Comment>
      {mdfd ? (
        <MdfdComment
          data={data}
          update={commentsUpdate}
          close={() => {
            onToggleMdfd(false);
          }}
        />
      ) : null}
    </Container>
  );
}
