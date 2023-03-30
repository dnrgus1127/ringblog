import React from "react";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { writeActions } from "../../redux/writeReducer";
import MarkdownInput from "./MarkdownInput";
import StringLength from "./StringLength";
import UnderMenu from "./UnderMenu";

const Input = styled.input`
  background: none;
  border: 0;
  outline: none;
  color: white;
`;
const Title = styled(Input)`
  width: 100%;

  font-size: 3rem;
  @media (max-width: 640px) {
    font-size: 2.5rem;
  }
`;

export default function PostEditor() {
  const postData = useSelector((state) => state.write.data);

  const dispatch = useDispatch();

  const changeTitle = (e) => {
    dispatch(writeActions.setTitle(e.target.value));
  };
  const changeContents = (value) => {
    dispatch(writeActions.setContent(value));
  };

  const MenuOnOff = () => {
    dispatch(writeActions.onToggleVisible());
  };

  return (
    <>
      <div className='inputArea'>
        <div className='titleAndHr'>
          <Title
            type='text'
            placeholder='제목을 입력하세요...'
            value={postData.title}
            onChange={changeTitle}
          />
          <hr />
        </div>
        <MarkdownInput data={postData.contents} onChange={changeContents} />
        <StringLength string={postData.contents} />
      </div>
      <UnderMenu onClick={MenuOnOff} />
    </>
  );
}
