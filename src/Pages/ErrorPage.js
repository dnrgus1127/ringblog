import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NotFoundPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorMsgBlcok = styled.div`
  h3 {
    font-size: 4rem;
    font-weight: 400;
  }
  h4 {
    font-size: 3rem;
    color: #ff8888;
  }

  blockquote {
    margin: 2rem 0;
  }
  .email {
    font-weight: 800;
  }
  .email:hover {
    color: ${({ theme }) => theme.pointColor};
    cursor: pointer;
  }
`;

const BackLastedPageButton = styled.button`
  width: 100%;
  background-color: ${({ theme }) => theme.pointColor};
  padding: 1rem 2rem;
  margin-top: 2rem;
  font-size: 1.6rem;
`;

const PAGE_ERROR_CODE = {
  404: {
    msg: "페이지를 찾을 수 없습니다!",
    codeMsg: "Not Found",
    comments: "입력하신 주소가 맞는지 다시 한번 확인 부탁드립니다.",
  },
  403: {
    msg: "로그인이 필요한 페이지입니다.",
    codeMsg: "Forbidden Error",
    comments: "접근 권한이 없거나 로그인이 필요한 페이지입니다.",
  },
};

export default function ErrorPage({ errorCode = 404 }) {
  const navigate = useNavigate();
  return (
    <NotFoundPage>
      <ErrorMsgBlcok>
        <h3>{PAGE_ERROR_CODE[errorCode].msg}</h3>
        <h4>
          {errorCode} <span>{PAGE_ERROR_CODE[errorCode].codeMsg}</span>
        </h4>
        <blockquote>
          {PAGE_ERROR_CODE[errorCode].comments} <br />
          관련된 도움이 필요하시면,{" "}
          <span className='email'>dnrgus1127@naver.com</span> 으로 문의해 주세요
        </blockquote>
        <BackLastedPageButton
          onClick={() => {
            navigate(-1);
          }}
        >
          돌아가기
        </BackLastedPageButton>
      </ErrorMsgBlcok>
    </NotFoundPage>
  );
}
