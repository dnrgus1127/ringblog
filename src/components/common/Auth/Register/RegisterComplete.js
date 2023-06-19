import React from "react";
import styled from "styled-components";

const RegisterCopleteBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40vh;
  width: 100%;
  text-align: center;

  h3 {
    font-size: 4rem;
    font-weight: 800;
    text-shadow: 0px 0px 15px rgba(128, 128, 128, 0.4);
  }
  p {
    font-size: 2rem;
    font-weight: 800;
  }
`;

export default function RegisterComplete() {
  return (
    <RegisterCopleteBlock>
      <div>
        <h3>회원 가입 성공</h3>
        <p>로그인해 주세요</p>
        {/* // TODO 로그인 하러 가기로 개선 시 UX 개선 가능 */}
      </div>
    </RegisterCopleteBlock>
  );
}
