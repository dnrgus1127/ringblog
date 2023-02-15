import React, { useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { relativeDate } from "../../../functions/dateFormat";
import { Context } from "../../../functions/Login/LoginProvider";
import { BtnCss } from "../../Button";
import ConfirmWindow from "../../ConfirmWindow";
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
  font-size: 1.3rem;

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
  padding-left: 1rem;
  justify-content: space-between;
  p {
    margin-right: 0.5rem;
  }
  .date {
    font-size: 1rem;
    color: ${({ theme }) => theme.greyColor};
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

export default function CommentItem({ children, commentsUpdate }) {
  const [hide, setHide] = useState(false);
  const { loggedUser } = useContext(Context);
  const [confirm, setConfirm] = useState(false);
  const [mdfd, setMdfd] = useState(false);
  const { setLoggedIn } = useContext(Context);

  // 댓글 삭제 처리
  const deleteComment = (commentId) => {
    fetch(`/comments?commentId=${commentId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.type !== 0) {
          // 로그인 해제된 경우
          if (data.type === 100) {
            alert("로그인 만료", data.msg);
            setLoggedIn(false);
          }
          // 인증 실패
          if (data.type === 101) {
            alert("올바르지 않은 접근 입니다.", data.msg);
          }
        } else {
          setMdfd(false);
        }
        commentsUpdate();
      });
  };

  // 수정, 삭제 확인 창
  const Confirm = (
    <ConfirmWindow
      title={`댓글 삭제`}
      message={`댓글을 정말로 삭제 하시겠습니까?`}
      cancel={() => {
        setConfirm(false);
      }}
      ok={() => {
        setConfirm(false);
        deleteComment(children._id);
      }}
    />
  );

  return (
    <Container>
      <CommentInfo>
        <div className='writerAndDate'>
          <p>{children.writer}</p>
          <p className='date'>{relativeDate(children.createDate)}</p>
        </div>

        {loggedUser.userId === children.writer ? (
          <div className='editDel'>
            <Btn
              onClick={() => {
                setMdfd(true);
              }}
            >
              수정
            </Btn>
            <Btn
              onClick={() => {
                setConfirm(true);
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
        {hide ? <p>가려진 댓글입니다.</p> : <p>{children.comment}</p>}
      </Comment>
      {mdfd ? (
        <MdfdComment
          data={children}
          update={commentsUpdate}
          close={() => {
            setMdfd(false);
          }}
        />
      ) : null}

      {/* 수정, 삭제 시 확인 취소 창 */}
      {confirm ? Confirm : null}
    </Container>
  );
}
