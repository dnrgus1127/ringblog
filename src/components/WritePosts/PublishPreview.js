import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { writeActions } from "../../redux/writeReducer";

const Preview = styled.div`
  width: 100%;
  height: 10vh;
  background-color: ${({ theme }) => theme.bgElement3};
  border-radius: 4px;
  margin-bottom: 1.5rem;

  textarea {
    padding: 1rem 2rem;
    font-family: inherit;
    font-size: 1.5rem;
  }
`;

export default function PublishPreview() {
  const { preview } = useSelector((state) => state.write);
  const dispatch = useDispatch();
  return (
    <Preview>
      {" "}
      <textarea
        name=''
        id=''
        cols='30'
        rows='10'
        placeholder='포스트 소개글 작성...'
        onChange={(e) => {
          dispatch(writeActions.setPreview(e.target.value));
        }}
        value={preview}
      ></textarea>
    </Preview>
  );
}
