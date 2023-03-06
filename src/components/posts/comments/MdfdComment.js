import React from "react";
import styled from "styled-components";

import useCmtMdfd from "../../../Hooks/Comments/useCmtMdfd";
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

      <Button
        onClick={() => {
          commentMdfd(comment);
        }}
      >
        수정하기
      </Button>
    </Container>
  );
}
