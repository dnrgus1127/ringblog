import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import media from "../../lib/style/media";
import { writeActions } from "../../redux/writeReducer";
import MarkdownInput from "./MarkdownInput";
import StringLength from "./StringLength";
import PostEditorUnderMenu from "./PostEditorUnderMenu";
import EditorToolBox from "./EditorToolBox";

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
    padding : 0 4rem;

`;

const MarkdownInputBlock = styled.div`
  textarea {

    background: none;
    outline: none;
    border: none;
    font-family: inherit;
    font-size: 1.8rem;
    width: 100%;
    height: 67vh;
    resize: none;
  }
  textarea::-webkit-scrollbar {
    width: 3px;
    height: 1rem;
  }
  textarea::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color};
  }
  textarea::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.bgElement};
  }

  ${media.xlarge} {
    textarea {
      height: 70vh;
    }
  }

  ${media.medium} {
    textarea {
      height: 77vh;
      padding: 0 calc(var(--gap) / 3);
      font-size: 1.6rem;
    }
  }
`;

const TitleAndHr = styled.div`
  padding-top: calc(var(--gap) / 2) ;
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
        {/* <EditorToolBox changeContents={changeContents} /> */}
        <MarkdownInputBlock>
          <MarkdownInput data={postData.contents} onChange={changeContents} />
        </MarkdownInputBlock>
        <StringLength
          string={postData.contents}
          // TODO 글자 수 초과 시 적용
          overLimit={() => { }}
          className='length'
        />
      </Editor>
      <PostEditorUnderMenu onClick={MenuOnOff} />
    </PostEditorBlock>
  );
}
