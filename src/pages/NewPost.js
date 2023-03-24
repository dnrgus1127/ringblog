import React, { useState } from "react";
import styled from "styled-components";
import { MarkdownCss } from "../components/common/markdown/MarkdownCss";
import { Post } from "../data/posts";
import { useEffect } from "react";
import CustomMD from "../components/common/markdown/CustomMD";
import { useQuery } from "../functions/urlQuery";
import MarkdownInput from "../components/WritePosts/MarkdownInput";
import StringLength from "../components/WritePosts/StringLength";
import UnderMenu from "../components/WritePosts/UnderMenu";
import { getPostByIndex } from "../functions/fetch";
import { useLogin } from "../Hooks/useLogin";
import { useContext } from "react";
import { Context } from "../functions/Login/LoginProvider";
import { useNavigate } from "react-router-dom";
import WritePostSetting from "../components/WritePosts/WritePostSetting";
import NewPostPublishScreen from "../container/write/NewPostPublishScreen";
import { useDispatch } from "react-redux";
import { writeActions } from "../redux/writeReducer";

const Container = styled.div`
  width: 100wh;
  height: 100vh;
  display: flex;
  font-family: "Noto Sans KR", sans-serif;
  overflow: hidden;
  .writeSection {
    width: 50%;
    height: 100vh;
  }

  position: relative;

  @media (max-width: 640px) {
    .writeSection {
      width: 100%;
    }
  }
`;

const Left = styled.div`
  background-color: ${({ theme }) => theme.bgElement};

  .titleAndHr {
    padding: calc(var(--gap) / 2);
  }
  .inputArea {
    padding-bottom: 0;
    height: 92vh;
  }
  input {
    font-family: inherit;
  }
  textarea {
    padding: 0 calc(var(--gap) / 2);

    background: none;
    outline: none;
    border: none;
    font-family: inherit;
    font-size: 1.8rem;
    width: 100%;
    height: 70vh;
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
  hr {
    margin: 2rem 0;
    border: 1.5px solid ${({ theme }) => theme.lineColor};
  }

  @media (max-width: 640px) {
    .inputArea {
      padding: 0 2rem;
    }

    hr {
      margin: 1rem 0;
    }
    .titleAndHr {
      padding: 2rem 1rem;
    }

    textarea {
      font-size: 1.6rem;
    }
  }
`;
const Right = styled.div`
  background-color: ${({ theme }) => theme.mdColor};
  overflow: scroll;
  overflow-x: hidden;
  padding: calc(var(--gap) / 2);
  &::-webkit-scrollbar {
    width: 3px;
    height: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color};
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.oppositeColor};
  }
  @media (max-width: 640px) {
    display: none;
  }
`;

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

export default function NewPost() {
  let query = useQuery();
  const { loggedUser, loggedIn } = useContext(Context);
  const [index, setIndex] = useState(null);
  const [contents, setContents] = useState("");
  const [title, setTitle] = useState();
  const newPost = new Post(title, contents);
  newPost.writer = loggedUser.userId;
  const [upComming, setUpComming] = useState(false);
  const [preview, setPrivew] = useState();
  const [data, setData] = useState({});
  const navigation = useNavigate();

  ///
  const dispatch = useDispatch();
  ///

  const MenuOnOff = () => {
    setUpComming(!upComming);
    dispatch(writeActions.onToggleVisible());
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };
  // 새 글 작성이 아니라 수정 하는 경우
  useEffect(() => {
    setIndex(query.get("index"));
  }, [query]);

  useEffect(() => {
    if (index) {
      getPostByIndex(index).then((data) => {
        setContents(data.contents);
        setTitle(data.title);
        if (data.preview !== "null") {
          setPrivew(data.preview);
        }
        setData(data);
      });
    }
  }, [index]);

  useLogin();

  useEffect(() => {
    if (!loggedIn) {
      alert("로그인이 필요합니다.");
      navigation("/");
    }
  }, [loggedIn, navigation]);

  return (
    <Container>
      {/* 좌측 화면 */}
      <Left className=' writeSection'>
        <div className='inputArea' action='/Posts'>
          <div className='titleAndHr'>
            <Title
              type='text'
              placeholder='제목을 입력하세요...'
              value={title || ""}
              onChange={changeTitle}
            />
            <hr />
          </div>
          <MarkdownInput data={contents} setData={setContents} />
          <StringLength string={contents} />
        </div>
        <UnderMenu index={index} onClick={MenuOnOff} />
      </Left>

      {/* 우측 화면  */}
      <Right className=' writeSection'>
        <MarkdownCss>
          <h1 style={{ marginBottom: "6rem" }}>{title}</h1>
          <CustomMD>{contents}</CustomMD>
        </MarkdownCss>
      </Right>
      {/* <WritePostSetting
        onOff={upComming}
        onOffEvent={MenuOnOff}
        obj={newPost}
        index={index}
        lastPreview={index ? preview : null}
        serverData={data}
      /> */}
      <NewPostPublishScreen onOff={upComming} onOffEvent={MenuOnOff} />
    </Container>
  );
}
