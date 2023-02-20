import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { ColorButton } from "../Button";
import { Context } from "../../functions/Login/LoginProvider";
import { alertMsg } from "../../functions/alerts";
import { useRcmndCnt } from "./hook/useRcmndCnt";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  background-color: ${({ theme }) => theme.bgElement3};
  border: 1px solid ${({ theme }) => theme.bgElement2};
  border-radius: 32px;
  @media (max-width: 640px) {
    display: none;
  }
  .countRcmnd {
    margin: 1.5rem 0;
  }
`;

const Button = styled(ColorButton)`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  margin: 0;
  padding: 0;
  background-color: ${({ theme }) =>
    (props) =>
      props.rcmd ? null : theme.bgElement2};

  &:hover {
    transform: none;
    transition: none;
    ${(props) => (props.rcmd ? null : { backgroundColor: "grey" })}
  }

  svg {
    fill: ${({ theme }) =>
      (props) =>
        props.rcmd ? theme.bgElement2 : theme.btnColor};
  }
`;

export default function SideMenu({ index, scroll }) {
  const [isRcmd, setIsRcmd] = useState(false);
  const { loggedUser, loggedIn, setLoggedIn } = useContext(Context);

  // 추천 갯수
  const { rcmndCnt } = useRcmndCnt(index, isRcmd);

  // 로그인 되어 있을 때만
  useEffect(() => {
    if (loggedIn) {
      fetch(`/rcmnd?postId=${index}&username=${loggedUser.username}`)
        .then((res) => res.json())
        .then((data) => {
          setIsRcmd(data.result);
        });
    }
  }, [loggedIn, loggedUser, index]);

  // 좋아요
  const unRcmnd = () => {
    fetch(`/rcmnd?postId=${index}&username=${loggedUser.username}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsRcmd(data.result);
        if (alertMsg(data.type)) {
          setLoggedIn(false);
        }
      });
  };
  // 좋아요 해제
  const doRcmnd = () => {
    fetch(`/rcmnd`, {
      method: "POST",
      body: JSON.stringify({ postId: index, username: loggedUser.username }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsRcmd(data.result);
        if (alertMsg(data.type)) {
          setLoggedIn(false);
        }
      });
  };
  return (
    <Container>
      <Button
        rcmd={isRcmd}
        onClick={() => {
          if (loggedIn) {
            if (isRcmd) {
              unRcmnd();
            } else {
              doRcmnd();
            }
          } else {
            alert("로그인이 필요합니다.");
          }
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
        >
          <path d='M5 22h-5v-12h5v12zm17.615-8.412c-.857-.115-.578-.734.031-.922.521-.16 1.354-.5 1.354-1.51 0-.672-.5-1.562-2.271-1.49-1.228.05-3.666-.198-4.979-.885.906-3.656.688-8.781-1.688-8.781-1.594 0-1.896 1.807-2.375 3.469-1.221 4.242-3.312 6.017-5.687 6.885v10.878c4.382.701 6.345 2.768 10.505 2.768 3.198 0 4.852-1.735 4.852-2.666 0-.335-.272-.573-.96-.626-.811-.062-.734-.812.031-.953 1.268-.234 1.826-.914 1.826-1.543 0-.529-.396-1.022-1.098-1.181-.837-.189-.664-.757.031-.812 1.133-.09 1.688-.764 1.688-1.41 0-.565-.424-1.109-1.26-1.221z' />
        </svg>
      </Button>
      <p className='countRcmnd'>{rcmndCnt}</p>
      <Button onClick={scroll}>
        <svg
          width='24'
          height='24'
          xmlns='http://www.w3.org/2000/svg'
          fillRule='evenodd'
          clipRule='evenodd'
        >
          <path d='M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625l-1.993 6.368 6.946-3c1.705.439 3.334.641 4.864.641 7.174 0 12.136-4.439 12.136-9.634 0-5.812-5.701-10.007-12-10.007zm0 1c6.065 0 11 4.041 11 9.007 0 4.922-4.787 8.634-11.136 8.634-1.881 0-3.401-.299-4.946-.695l-5.258 2.271 1.505-4.808c-1.308-1.564-2.165-3.128-2.165-5.402 0-4.966 4.935-9.007 11-9.007zm-5 7.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z' />
        </svg>
      </Button>
    </Container>
  );
}
