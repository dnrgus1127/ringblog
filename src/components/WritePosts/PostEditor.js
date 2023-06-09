import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import media from "../../lib/style/media";
import { writeActions } from "../../redux/writeReducer";
import StringLength from "./StringLength";
import PostEditorUnderMenu from "./PostEditorUnderMenu";
import MarkdownEditorContainer from "../../container/write/MarkdownEditorContainer";

const PostEditorBlock = styled.div`
  .length {
    text-align: end;
    padding-right: 2rem;
  }

  .inputArea {
    padding-bottom: 0;
    height: 92vh;
  }
  input {
    font-family: inherit;
  }

  ${media.medium} {
    .inputArea {
      padding: 0 2rem;
    }
  }
`;

const Editor = styled.div`
  padding: 0 4rem;
`;

const TitleAndHr = styled.div`
  padding-top: calc(var(--gap) / 2);
  hr {
    margin: 2rem 0;
    border: 1.5px solid ${({ theme }) => theme.lineColor};
  }

  ${media.medium} {
    padding: 2rem 1rem;

    hr {
      margin: 1rem 0;
    }
  }
`;

const Input = styled.input`
  background: none;
  border: 0;
  outline: none;
`;
const Title = styled(Input)`
  width: 100%;
  font-weight: 800;

  font-size: 3rem;
  @media (max-width: 640px) {
    font-size: 2.4rem;
    font-weight: 400;
  }
`;

export default function PostEditor() {
  const markDownEditorRef = useRef();
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
    <PostEditorBlock>
      <Editor className='inputArea'>
        <TitleAndHr>
          <Title
            type='text'
            placeholder='제목을 입력하세요...'
            value={postData.title}
            onChange={changeTitle}
          />
          <hr />
        </TitleAndHr>
        <MarkdownEditorContainer
          markDownEditorRef={markDownEditorRef}
          editorValue={postData.contents}
          onChange={changeContents}
        />
        <StringLength
          string={postData.contents}
          // TODO 글자 수 초과 시 적용
          overLimit={() => {}}
          className='length'
        />
      </Editor>
      <PostEditorUnderMenu onClick={MenuOnOff} />
    </PostEditorBlock>
  );
}
