import React, { useRef, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styled from "styled-components";
import { MarkdownCss } from "../css/MarkdownCss";

import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { Link } from "react-router-dom";
import UpCommingMenu from "../components/newPost/UpCommingMenu";
import { Post } from "../data/posts";
import { useEffect } from "react";
import remarkGfm from "remark-gfm";

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
  hr {
    margin: 2rem 0;
    border: 1.5px solid ${({ theme }) => theme.lineColor};
  }
  position: relative;
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
    font-size: 2rem;
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
`;

const UnderMenu = styled.div`
  background-color: ${({ theme }) => theme.bgElement2};
  box-shadow: 0px 0p 5px rgba(0, 0, 0, 0.7);
  height: 8vh;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btnWrap {
    display: flex;
  }
`;

const Btn = styled.button`
  font-size: 2rem;
  font-weight: 800;
  font-family: "Noto Sans KR", sans-serif;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(64, 64, 64, 0.7);
  }
`;

const BtnBack = styled(Btn)`
  padding: 0.5rem 2rem;
  border-radius: 4px;
`;

const Button = styled(Btn)`
  background-color: ${({ theme }) =>
    (props) =>
      props.bg ? theme.btnColor : "none"};

  padding: 0.5rem 2rem;
  border-radius: 4px;
  color: ${({ theme }) =>
    (props) =>
      props.bg ? theme.oppositeColor : theme.btnColor};
  margin-left: 2rem;
  &:hover {
    background-color: ${({ theme }) =>
      (props) =>
        props.bg ? theme.btnHover : "none"};
  }
`;

const ContentLength = styled.div`
  text-align: right;
  padding-top: 1rem;
  padding-right: 2rem;
  font-size: 1rem;
`;

export default function NewPost() {
  const maxLength = 5000;
  const [contents, setContents] = useState("");
  const [title, setTitle] = useState();
  const [upComming, setUpComming] = useState(false);
  const newPost = new Post(title, contents);
  const taRef = useRef();
  const [cursor, setCursor] = useState(0);

  // tab, enter 등 특수문자 입력시
  /**
   * contents에 특수문자 입력하는 함수
   * @param {*} HTMLnode (e.target)
   * @param {*} char 특수문자("\t","\n")
   */
  const enterSpecialChar = (
    { value, selectionStart, selectionEnd },
    char,
    len
  ) => {
    console.log(char);
    setContents(
      value.substring(0, selectionStart) + char + value.substring(selectionEnd)
    );
    setCursor(selectionStart + len);
  };

  // 특수문자 입력 후 커서 위치 조정하는 hook
  useEffect(() => {
    taRef.current.setSelectionRange(cursor, cursor);
  }, [cursor]);

  const MenuOnOff = () => {
    setUpComming(!upComming);
  };

  return (
    <Container>
      {/* 좌측 화면 */}
      <Left className='left writeSection'>
        <div className='inputArea' action='/Posts'>
          <div className='titleAndHr'>
            <Title
              type='text'
              placeholder='제목을 입력하세요...'
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <hr />
          </div>
          {/* // ! */}
          <textarea
            ref={taRef}
            onChange={(e) => {
              setContents(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                enterSpecialChar(e.target, "\t", 1);
              } else if (e.key === "Enter") {
                e.preventDefault();
                enterSpecialChar(e.target, "  \n", 3);
              }
            }}
            value={contents}
          ></textarea>
          <ContentLength>
            <span
              style={
                contents.length > maxLength
                  ? { color: "red" }
                  : { color: "grey" }
              }
            >
              {contents.length}
            </span>{" "}
            / {maxLength}
          </ContentLength>
        </div>
        <UnderMenu>
          <Link to={"/"}>
            <BtnBack>나가기</BtnBack>
          </Link>

          <div className='btnWrap'>
            <Button onClick={MenuOnOff} bg={false}>
              임시저장
            </Button>
            <Button bg={true} onClick={MenuOnOff}>
              제출하기
            </Button>
          </div>
        </UnderMenu>
      </Left>
      {/* 우측 화면  */}
      <Right className='right writeSection'>
        <MarkdownCss>
          <h1 style={{ marginBottom: "6rem" }}>{title}</h1>
          <ReactMarkdown
            children={contents}
            remarkPlugins={[remarkGfm]}
            // Code Hilghter
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    language={match[1]}
                    style={stackoverflowDark}
                  >
                    {children}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          ></ReactMarkdown>
        </MarkdownCss>
      </Right>
      <UpCommingMenu onOff={upComming} onOffEvent={MenuOnOff} obj={newPost} />
    </Container>
  );
}
