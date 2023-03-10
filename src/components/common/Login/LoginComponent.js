import React, { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Context } from "../../../functions/Login/LoginProvider";
import { InputCss } from "../../../styledCss/InputCss";
import { ColorButton } from "../../Button";
import Loading from "../../Loading";

const Input = styled(InputCss)``;

const Button = styled(ColorButton)`
  font-size: 1.6rem;
  margin: 0 1rem;
`;

const Form = styled.form`
  .buttonBox {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default function LoginComponent({ onOff }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const { setLoggedUser, setLoggedIn } = useContext(Context);
  const [authFail, setAuthFail] = useState(false);
  const [failType, setFailType] = useState(999);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  // 로그인 요청
  const submit = (e) => {
    e.preventDefault();
    if (id.length === 0 || pw.length === 0) {
      alert(
        `${id.length === 0 ? "아이디" : "비밀번호"}를 빈칸으로 둘 수 없습니다.`
      );
    } else {
      //Fetch Component 실행
      //!- Fetch Component 수정 필요
      setLoading(true);
      fetch("/login", {
        method: "POST",
        body: JSON.stringify({ userId: id, password: pw }),
        headers: { "Content-Type": "application/json" },
      })
        .then((data) => data.json())
        .then((result) => {
          // 로그인 실패 시 {authSuccess(bool), failMessage(String)}
          setLoading(false);
          if (!result.authSuccess) {
            setAuthFail(true);
            setFailType(result.failType);
          } else {
            // 로그인 성공 시 {userId(String), username(String)} Object result
            setLoggedUser(result);
            setLoggedIn(true);
            onOff();
          }
        });
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <React.Fragment>
      <h2>로그인</h2>
      <Form onSubmit={submit}>
        <Input
          ref={inputRef}
          value={id}
          placeholder='아이디 입력'
          onChange={(e) => {
            setId(e.target.value);
          }}
          type='text'
          fail={failType === 0}
        />
        <Input
          placeholder='패스워드 입력'
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
          }}
          type='password'
          fail={failType === 1}
        />
        {authFail ? <LoginFail setClose={setAuthFail} type={failType} /> : null}

        <div className='buttonBox'>
          <Button bg={""} type='submit'>
            로그인
          </Button>
        </div>
      </Form>

      {/* <h3>소셜 계정 ID 로그인</h3> */}
      {loading ? <Loading text='로그인 중' /> : null}
    </React.Fragment>
  );
}

const FailBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: start;

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

  .closeButton {
    display: inline-block;
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    font-weight: 800;
    cursor: pointer;
  }
`;

/**
 * 로그인 실패 경고 메세지 컴포넌트
 * @props {number} type -> 0 : 아이디, 1 : 패스워드
 * @returns  <FailBox/>
 */
function LoginFail({ setClose, type }) {
  const ErrorType = ["존재하지 않는 아이디 입니다.", "비밀번호가 틀렸습니다."];

  return (
    <FailBox>
      {/* <button
        className='closeButton'
        onClick={() => {
          setClose(false);
        }}
      >
        닫기
      </button> */}
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
