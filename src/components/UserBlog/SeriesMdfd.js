import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import styled from "styled-components";
import useBoolean from "../../Hooks/useBoolean";
import { useFetch } from "../../Hooks/useFetch";
import { BtnCss, ColorButton } from "../Button";

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

  .title {
    color: ${({ theme }) => theme.btnColor};
    font-size: 2.4rem;
    font-weight: 800;
  }

  h4 {
    margin-bottom: 1rem;
  }

  .btn {
    text-align: end;
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

export default function SeriesMdfd({ cancel, data }) {
  const posts = useFetch(`/series/postsById?seriesId=${data._id}`);
  const [mdfdTitle, onToggleMdfdTitle] = useBoolean(false);
  const editTitleRef = useRef();
  const [title, setTitle] = useState(data.title);
  const [postNumbers, setNumbers] = useState(new Set());

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
        deletePostsNumber: Array.from(postNumbers),
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(console.log);
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
        <h4>글 목록</h4>
        <PostsCheckBox>
          {posts.data &&
            posts.data.map((item, idx) => (
              <label key={idx} className='checkbox'>
                <input
                  type='checkbox'
                  value={item._id}
                  onChange={(e) => {
                    if (e.target.checked) {
                      addNumbers(e.target.value);
                    } else {
                      delNumbers(e.target.value);
                    }
                  }}
                />
                <span className='checkbox_icon'></span>
                <span className='checkbox_text'>{item.title}</span>
              </label>
            ))}
        </PostsCheckBox>
        <div className='btn'>
          <CancelButton onClick={cancel}>취소</CancelButton>
          <OkButton onClick={mdfdSeries}>수정</OkButton>
        </div>
      </MdfdContainer>
    </Container>
  );
}

//체크 박스 CSS
const PostsCheckBox = styled.div`
  .checkbox input {
    display: none;
  }
  // 체크박스 테두리
  .checkbox_icon {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.btnColor};
    position: relative;
    cursor: pointer;
  }

  // 체크박스 가상요소
  .checkbox_icon::before,
  .checkbox_icon::after {
    content: ""; // 가상요소 필수값
    display: inline-block; // 크기 지정
    width: 2px;
    height: 0; // 체크박스가 체크가 되면 변화값으로 커지게 하기 위해 (일단 화면에는 나타나지 않음)
    background-color: ${({ theme }) => theme.btnColor};
    position: absolute; // 체크박스 테두리 기준으로 위치조정 가능
    transform-origin: left top; // 기울기 지정, 기준점을 왼쪽 상단 모서리로 (기본값은 중심임)
  }

  // 가상요소 before
  .checkbox_icon::before {
    top: 10px; // 위치값 top
    left: 2px; // 위치값 left
    transform: rotate(-45deg); // 회전값
  }

  // 가상요소 after
  .checkbox_icon::after {
    top: 15px; // 위치값 top
    left: 8px; // 위치값 left
    transform: rotate(-135deg); // 회전값
  }

  // 체크되었을 때 테투리 설정
  .checkbox input:checked + .checkbox_icon {
    /* border-color: red; */
  }

  // 체크되었을 때 가상요소 before
  .checkbox input:checked + .checkbox_icon::before {
    height: 7px; // 높이값 지정
    transition: all 0.15s ease; // 0.15초 변화시간 줌
  }

  // 체크되었을 때 가상요소 after
  .checkbox input:checked + .checkbox_icon::after {
    height: 14px; // 높이값 지정
    transition: all 0.15s ease 0.15s; // 0.15초 변화시간 + 딜레이 시간 줌
  }

  .checkbox_text {
    margin-left: 0.8rem;
    font-size: 1.4rem;
  }
  .checkbox_text:hover {
    color: ${({ theme }) => theme.btnColor};
    cursor: pointer;
  }

  label {
    display: flex;
    align-items: center;
    margin-bottom: 0.7rem;
  }
  .checkbox input:checked ~ .checkbox_text {
    text-decoration: line-through;
    text-decoration-color: ${({ theme }) => theme.warning};
  }
`;

const CancelButton = styled(BtnCss)`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.color};
`;

const OkButton = styled(ColorButton)`
  font-size: 1.6rem;
`;
