import React, { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styled from "styled-components";
import { MarkdownCss } from "../css/MarkdownCss";

import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { Link } from "react-router-dom";
import { postBlogPost } from "../functions/fetch";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  font-family: "Noto Sans KR", sans-serif;
  .writeSection {
    width: 50%;
    height: 100vh;
  }
  hr {
    margin: 2rem 0;
    border: 1.5px solid ${({ theme }) => theme.lineColor};
  }
`;

const Left = styled.div`
  background-color: ${({ theme }) => theme.bgElement};

  .titleAndHr {
    padding: calc(var(--gap) / 2);
  }
  form {
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

export default function NewPost() {
  const [contents, setContents] = useState("");
  const [title, setTitle] = useState();

  const textAreaInputTab = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      setContents(contents + "\t");
    }
  };
  return (
    <Container>
      {/* 좌측 화면 */}
      <Left className='left writeSection'>
        <form action='/Posts'>
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
          <textarea
            onChange={(e) => {
              setContents(e.target.value);
            }}
            onKeyDown={(e) => {
              textAreaInputTab(e);
            }}
            value={contents}
          ></textarea>
        </form>
        <UnderMenu>
          <Link to={"/"}>
            <BtnBack>나가기</BtnBack>
          </Link>
          <div className='btnWrap'>
            <Button bg={false}>임시저장</Button>
            <Button
              bg={true}
              onClick={() => {
                postBlogPost({ contents: contents, title: title });
              }}
            >
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
            // Code Hilghter
            components={{
              code({ node, inline, className, children, ...props }) {
                console.log(className, inline);
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
    </Container>
  );
}
