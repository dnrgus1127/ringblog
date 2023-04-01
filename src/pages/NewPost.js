import React from "react";
import styled from "styled-components";
import { MarkdownCss } from "../components/common/markdown/MarkdownCss";
import { useEffect } from "react";
import CustomMD from "../components/common/markdown/CustomMD";
import { useQuery as paramQuery } from "../functions/urlQuery";
import { useLogin } from "../Hooks/useLogin";
import { useContext } from "react";
import { Context } from "../functions/Login/LoginProvider";
import { useNavigate } from "react-router-dom";
import NewPostPublishScreen from "../container/write/NewPostPublishScreen";
import { useDispatch, useSelector } from "react-redux";
import { writeActions } from "../redux/writeReducer";
import PostEditor from "../components/WritePosts/PostEditor";
import { domain } from "../lib/fetch/domain";
import { useQuery } from "react-query";
import Loading from "../components/Loading";

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

export default function NewPost() {
  let query = paramQuery();

  const { postNumber, edit } = useSelector((state) => state.write);
  const postData = useSelector((state) => state.write.data);

  const { loggedIn } = useContext(Context);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  useLogin();

  useEffect(() => {
    return () => {
      dispatch(writeActions.clearData());
    };
  }, [dispatch]);

  //uri에 인덱스 쿼리스트링 존재하면 수정으로 판단
  useEffect(() => {
    const index = query.get("index");
    if (index) {
      dispatch(writeActions.setEdit(index));
    }
  }, [dispatch, query]);

  // 수정 시 포스트 정보 불러옴
  const { data, isLoading } = useQuery(
    ["postDataQuery", postNumber],
    async () => {
      const response = await fetch(`${domain}/posts/${postNumber}`);
      return await response.json();
    },
    {
      enabled: postNumber > 0,
    }
  );

  const seriesQuery = useQuery(
    "series",
    async () => {
      const response = await fetch(
        `${domain}/series/ForPost?postId=${postNumber}`
      );
      return response.json();
    },
    {
      enabled: postNumber > 0,
    }
  );

  useEffect(() => {
    if (seriesQuery.data) {
      dispatch(
        writeActions.selectSeries({
          id: seriesQuery.data._id,
          title: seriesQuery.data.title,
        })
      );
    }
  }, [seriesQuery.data, dispatch]);

  // redux store 에 불러온 포스트 정보 저장
  // useQuery onSuccess 내부에서 dispatch 실행 시 입력한 데이터가 날라가는 문제가 있어서 useEffect로 분리하였음
  useEffect(() => {
    // 수정중이고 데이터가 불러와졌다면
    if (data && edit) {
      dispatch(writeActions.setData({ ...data }));
    }
  }, [data, dispatch, edit]);

  // 로그인 검증 // TODO 로그인한 유저와 작성자가 일치하는지 확인할 필요 있음
  useEffect(() => {
    if (!loggedIn) {
      alert("로그인이 필요합니다.");
      navigation("/");
    }
  }, [loggedIn, navigation]);

  return (
    <Container>
      {isLoading ? <Loading text={"로딩중"} /> : null}
      <Left className='writeSection'>
        <PostEditor />
      </Left>

      <Right className='writeSection'>
        <MarkdownCss>
          <h1 style={{ marginBottom: "6rem" }}>{postData.title}</h1>
          <CustomMD>{postData.contents}</CustomMD>
        </MarkdownCss>
      </Right>
      <NewPostPublishScreen />
    </Container>
  );
}
