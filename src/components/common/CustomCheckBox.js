import React from "react";

import styled, { keyframes } from "styled-components";

const slide = keyframes`
from {
  transform: translateX(-30%);
}
to {
  transform: translateX(0);
}
`;

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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .checkbox_text:hover {
    color: ${({ theme }) => theme.btnColor};
    cursor: pointer;
  }

  .checkbox input:checked ~ .checkbox_text {
    color: ${({ theme }) => theme.btnColor};
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 0.7rem;

  transform: translateX(-30%);

  animation: ${slide} 0.5s ${(props) => `${props.idx * 0.05}s`} ease-in-out
    alternate forwards;
`;

export default function CustomCheckBox({ data, check, unCheck, includeList }) {
  return (
    <PostsCheckBox>
      {data &&
        data.map((item, idx) => (
          <Label idx={idx} key={idx} className='checkbox'>
            <Input
              item={item}
              init={includeList}
              check={check}
              unCheck={unCheck}
            />
          </Label>
        ))}
    </PostsCheckBox>
  );
}

function Input({ item, init, check, unCheck }) {
  return (
    <>
      <input
        type='checkbox'
        value={item._id}
        checked={init(`${item._id}`)}
        onChange={(e) => {
          if (e.target.checked) {
            check(e.target.value);
          } else {
            unCheck(e.target.value);
          }
        }}
      />
      <span className='checkbox_icon'></span>
      <span className='checkbox_text'>{item.title}</span>
    </>
  );
}
