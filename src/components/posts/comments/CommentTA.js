import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const CommentTextArea = styled.textarea`
  background-color: ${({ theme }) => theme.bgElement};
  border: 0.1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);

  border-radius: 2px;
  padding: 1.5rem 2.5rem;
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

export default function CommentTA(props) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref && ref.current) {
      // ref.current.style.height = 'auto';
      let height = ref.current.scrollHeight; // 높이
      ref.current.style.height = `${height}px`;
    }
  }, [props.value])



  return <CommentTextArea ref={ref} rows={1} {...props}></CommentTextArea>;
}
