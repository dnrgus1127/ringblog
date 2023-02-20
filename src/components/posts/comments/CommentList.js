import React, { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import styled from "styled-components";
import { ColorButton } from "../../Button";

const MoreButton = styled(ColorButton)`
  width: 100%;
  background-color: ${({ theme }) => theme.btnColor};
  color: black;
  border-radius: 4px;
  padding: 1rem;
  &:hover {
    transform: none;
  }
`;

export default function CommentList({ data, update }) {
  const [value, setValue] = useState(5);

  useEffect(() => {}, [value]);
  const list = data.slice(0, value);
  return (
    <div>
      <p>{data.length}개의 댓글</p>
      {list.map((item, idx) => (
        <CommentItem key={idx} commentsUpdate={update}>
          {item}
        </CommentItem>
      ))}
      {value < data.length ? (
        <MoreButton
          onClick={() => {
            setValue(value + 5);
          }}
        >
          더 보기
        </MoreButton>
      ) : (
        <div>마지막 댓글입니다.</div>
      )}
    </div>
  );
}
