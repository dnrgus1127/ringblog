import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import styled from "styled-components";
import { Context } from "../../functions/Login/LoginProvider";
import useBoolean from "../../Hooks/useBoolean";
import { useFetch } from "../../Hooks/useFetch";
import { BtnCss, ColorButton } from "../Button";
import CustomCheckBox from "../common/CustomCheckBox";

const Container = styled.div`
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const MdfdContainer = styled.div`
  background-color: ${({ theme }) => theme.bgElement2};
  border-radius: 4px;
  padding: 2rem 3rem;
  min-width: 25vw;

  .title {
    color: ${({ theme }) => theme.btnColor};
    font-size: 2.4rem;
    font-weight: 800;

    @media (max-width: 640px) {
      width: 60vw;
    }
  }

  .btn {
    text-align: end;
  }
  @media (max-width: 640px) {
    min-width: 80vw;
    max-width: 90vw;
  }

  .addPostsBtn {
    text-align: center;
    width: 100%;
    height: 100%;
    background-color: rgb(68, 85, 78);

    font-size: 1.6rem;
    font-weight: 800;

    padding: 0.5rem;
    cursor: pointer;
    margin-bottom: 1rem;
  }
`;

const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  button {
    cursor: pointer;
    margin-left: 1.6rem;
  }

  svg {
    width: 3rem;
    height: 3rem;
    fill: ${({ theme }) => theme.btnColor};
  }
`;

const PostListTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  button {
    cursor: pointer;
  }

  .postsCnt {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.greyColor};
  }

  svg {
    width: 2.5rem;
    height: 2.5rem;
    fill: ${({ theme }) => theme.btnColor};
  }

  /* svg:hover {
    transform: rotate(-180deg);
    transition: 0.5s all ease-in-out;
  } */
`;

export default function SeriesMdfd({ close, data, refresh }) {
  const posts = useFetch(`/series/postsById?seriesId=${data._id}`);
  const [mdfdTitle, onToggleMdfdTitle] = useBoolean(false);
  const editTitleRef = useRef();
  const [title, setTitle] = useState(data.title);
  const [postNumbers, setNumbers] = useState(new Set([]));
  const [choosePosts, onToggleChoose, setChoosePosts] = useBoolean(false);
  const [showPostList, onToggleShowPostList] = useBoolean(false);

  const { loggedUser } = useContext(Context);
  const notHaveSeries = useFetch(
    `/series/unSeriesPosts?writer=${loggedUser.userId}`
  );

  // 시리즈에서 삭제할 포스트 id 배열 추가
  const addNumbers = (addNumber) => {
    setNumbers((prevItem) => new Set([...prevItem, addNumber]));
  };

  const delNumbers = (delNumbers) => {
    setNumbers((prevItem) => {
      prevItem.delete(delNumbers);
      return new Set([...prevItem]);
    });
  };

  useEffect(() => {
    !showPostList && setChoosePosts(false);
  }, [showPostList, setChoosePosts]);

  // 이미 시리즈속에 있는 포스트들을 선택된 리스트에 추가
  useEffect(() => {
    posts.data &&
      posts.data.forEach((item) => {
        addNumbers(`${item._id}`);
      });
  }, [posts.data]);

  // 선택 리스트 안에 해당 포스트번호가 있는지 확인
  const checkIncludeChooseList = (value) => {
    return postNumbers.has(value);
  };

  // 제목 수정 input 활성화
  const editTitle = useCallback(() => {
    onToggleMdfdTitle();
  }, [onToggleMdfdTitle]);

  // 제목 수정 시 포커싱
  useEffect(() => {
    editTitleRef.current && editTitleRef.current.focus();
  }, [mdfdTitle]);

  // 수정 fetch
  const mdfdSeries = () => {
    fetch(`/series/mdfd?seriesId=${data._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: title,
        PostsNumbers: Array.from(postNumbers),
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        close();
        refresh();
      });
  };

  return (
    <Container>
      <MdfdContainer>
        <TitleWrap>
          {mdfdTitle ? (
            <input
              className='title'
              type='text'
              ref={editTitleRef}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onToggleMdfdTitle();
                }
              }}
            />
          ) : (
            <p className='title'>{title}</p>
          )}
          <button onClick={editTitle}>
            <svg
              clipRule='evenodd'
              fillRule='evenodd'
              strokeLinejoin='round'
              strokeMiterlimit='2'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.749c0-.414.336-.75.75-.75s.75.336.75.75v9.249c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm1.521 9.689 9.012-9.012c.133-.133.217-.329.217-.532 0-.179-.065-.363-.218-.515l-2.423-2.415c-.143-.143-.333-.215-.522-.215s-.378.072-.523.215l-9.027 8.996c-.442 1.371-1.158 3.586-1.264 3.952-.126.433.198.834.572.834.41 0 .696-.099 4.176-1.308zm-2.258-2.392 1.17 1.171c-.704.232-1.274.418-1.729.566zm.968-1.154 7.356-7.331 1.347 1.342-7.346 7.347z'
                fill-rule='nonzero'
              />
            </svg>
          </button>
        </TitleWrap>
        <PostListTop>
          <h4>
            글 목록{" "}
            <span className='postsCnt'>
              ({posts.data ? posts.data.length : 0})
            </span>
          </h4>
          <div>
            <button onClick={onToggleShowPostList}>
              <svg
                clipRule='evenodd'
                fillRule='evenodd'
                stroke-linejoin='round'
                stroke-miterlimit='2'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='m15 17.75c0-.414-.336-.75-.75-.75h-11.5c-.414 0-.75.336-.75.75s.336.75.75.75h11.5c.414 0 .75-.336.75-.75zm7-4c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-4c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z'
                  fillRule='nonzero'
                />
              </svg>
            </button>
          </div>
        </PostListTop>
        {showPostList ? (
          <>
            <CustomCheckBox
              data={posts.data}
              check={addNumbers}
              unCheck={delNumbers}
              defaultCheck={true}
              includeList={checkIncludeChooseList}
            />
            <button onClick={onToggleChoose} className='addPostsBtn'>
              포스트 추가
            </button>
          </>
        ) : null}
        {choosePosts ? (
          <CustomCheckBox
            data={notHaveSeries.data && notHaveSeries.data}
            check={addNumbers}
            unCheck={delNumbers}
            includeList={checkIncludeChooseList}
          />
        ) : null}
        <div className='btn'>
          <CancelButton onClick={close}>취소</CancelButton>
          <OkButton onClick={mdfdSeries}>수정</OkButton>
        </div>
      </MdfdContainer>
      {/* {choosePosts ? (
        <ChoosePosts
          addNumbers={addNumbers}
          delNumbers={delNumbers}
          includeList={checkIncludeChooseList}
          postList={notHaveSeries.data}
        />
      ) : null} */}
    </Container>
  );
}

const CancelButton = styled(BtnCss)`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.color};
`;

const OkButton = styled(ColorButton)`
  font-size: 1.6rem;
`;
