import React from "react";
import styled from "styled-components";

import useCmtMdfd from "../../../Hooks/Comments/useCmtMdfd";
import CommentTA from "./CommentTA";
import { ConfirmButton } from "../../common/button/Button";

const Container = styled.div`
  text-align: end;
`;

export default function MdfdComment({ data, update, close }) {
  const { comment, commentMdfd, setComment } = useCmtMdfd(
    data._id,
    data.comment,
    () => {
      close();
      update();
    }
  );

  return (
    <Container>
      <CommentTA
        name=''
        id=''
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></CommentTA>

      <ConfirmButton
        onClick={() => {
          commentMdfd(comment);
        }}
      >
        수정하기
      </ConfirmButton>
    </Container>
  );
}
