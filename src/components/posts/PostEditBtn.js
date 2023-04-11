import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deletePost } from "../../functions/fetch";

const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  margin: 1.5rem 0;
  align-items: center;
  a {
    display: flex;
    align-items: center;
  }
`;

const Btn = styled.button`
  background: none;
  border: none;
  margin-left: 1rem;
  color: ${({ theme }) => theme.btnColor};
  font-weight: 800;
  font-size: 1.6rem;

  &:hover {
    color: ${({ theme }) => theme.greyColor};
  }
`;

export default function PostEditBtn({ index, auth }) {
  const navigate = useNavigate();

  return (
    <Wrapper>
      {auth && (
        <>
          <Link to={`/writeNewPost?index=${index}`}>
            <Btn>수정</Btn>
          </Link>
          <Btn
            onClick={() => {
              if (window.confirm("정말로 삭제하시겠습니까?") === true) {
                deletePost(index)
                  .then(alert("삭제되었습니다."))
                  .then(navigate("/"));
              } else {
                alert("삭제되지 않습니다.");
              }
            }}
          >
            삭제
          </Btn>
        </>
      )}
      <Btn
        onClick={() => {
          navigate(-1);
        }}
      >
        목록
      </Btn>
    </Wrapper>
  );
}
