import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deletePost } from "../../functions/fetch";

const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  margin: 1.5rem 0;
`;

const Btn = styled.button`
  background: none;
  border: none;
  margin-left: 1rem;
  color: ${({ theme }) => theme.btnColor};
  font-size: 1.6rem;

  &:hover {
    color: ${({ theme }) => theme.greyColor};
  }
`;

export default function PostEditBtn({ index }) {
  const navigate = useNavigate();

  return (
    <Wrapper>
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
    </Wrapper>
  );
}
