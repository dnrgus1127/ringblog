import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Context } from "../../../functions/Login/LoginProvider";
import { FullStamp } from "../../../functions/time";
import { ColorButton } from "../../Button";
import CommentTA from "./CommentTA";

const Container = styled.div`
  text-align: end;
`;

const Button = styled(ColorButton)`
  margin: 0;
  font-size: 1.4rem;
`;

export default function MdfdComment({ data, update, close }) {
  const [value, setValue] = useState(data.comment);
  const { setLoggedIn } = useContext(Context);
  // 댓글 수정 처리
  const mdfdComment = (value) => {
    fetch(`/comments?commentId=${data._id}`, {
      method: "PATCH",
      body: JSON.stringify({ comment: value, mdfdDate: FullStamp() }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.type === 100) {
          alert("로그인 만료.");
          setLoggedIn(false);
        } else if (data.type === 101) {
          alert("잘못된 접근입니다.");
          setLoggedIn(false);
        }
      })
      .then(close)
      .then(update);
  };

  return (
    <Container>
      <CommentTA
        name=''
        id=''
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></CommentTA>

      <Button
        onClick={() => {
          mdfdComment(value);
        }}
      >
        수정하기
      </Button>
    </Container>
  );
}
