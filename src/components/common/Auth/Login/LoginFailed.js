import React from "react";
import styled from "styled-components";

const FailBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: start;
  text-align: left;

  background-color: ${({ theme }) => theme.warning};
  border-radius: 4px;
  border: 1.5px solid ${({ theme }) => theme.greyColor};
  padding: 1rem 2rem;
  margin: 2rem 0;

  h5,
  p,
  button {
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
    color: white;
  }
  h5 {
    margin: 0;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.4rem;
    font-weight: 800;
    margin-bottom: 1rem;
  }

  a {
    color: lightgrey;
    border-bottom: 1.5px solid lightgrey;
  }
`;

export default function LoginFailed({ type, isLoginFailed = false }) {
  const ErrorType = ["존재하지 않는 아이디 입니다.", "비밀번호가 틀렸습니다."];
  if (!isLoginFailed) return;
  return (
    <FailBox>
      <div>
        <h5>⚠️ 로그인 실패</h5>
        <p>{ErrorType[type]}</p>
        <p>대소문자, 특수문자 입력에 주의하여 다시 입력해 주세요.</p>
        <p>
          <a href='/'>로그인과 관련되어 궁금한게 있으신가요?</a>
        </p>
      </div>
    </FailBox>
  );
}
