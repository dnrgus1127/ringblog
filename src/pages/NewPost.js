import React, { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styled from "styled-components";
import { MarkdownCss } from "../css/MarkdownCss";

import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const Container = styled.div`
  width: 100%;
  height: 200vh;
  display: flex;
  font-family: "Noto Sans KR", sans-serif;
  input {
    font-family: inherit;
  }
  textarea {
    background: none;
    outline: none;
    border: none;
    font-family: inherit;
    font-size: 2rem;
  }
  .left {
    background-color: ${({ theme }) => theme.bgElement};
  }
  .right {
    background-color: ${({ theme }) => theme.mdColor};
  }

  .writeSection {
    width: 50%;
    height: 100%;
    padding: calc(var(--gap) / 2);
  }

  hr {
    margin: 2rem 0;
    border: 1.5px solid ${({ theme }) => theme.lineColor};
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

export default function NewPost() {
  const [contents, setContents] = useState("");

  return (
    <Container>
      <div className='left writeSection'>
        <form action='/Posts'>
          <Title type='text' placeholder='제목을 입력하세요...' />
          <hr />
          <textarea
            onChange={(e) => {
              setContents(e.target.value);
            }}
          ></textarea>
        </form>
      </div>
      <div className='right writeSection'>
        <MarkdownCss>
          <ReactMarkdown
            children={contents}
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
      </div>
    </Container>
  );
}
