import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import remarkGfm from "remark-gfm";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

// TODO - 다크모드 아닐 때 SyntaxHighlighter style 추가 필요
export default function CustomMD({ children }) {
  return (
    <ReactMarkdown
      children={children}
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      // Code Hilghter
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            // ? 언어에 따라서 코드 구문 스타일 지정
            <SyntaxHighlighter
              language={match[1]}
              style={stackoverflowDark}
              customStyle={{ padding: "1.5rem 1rem" }}
            >
              {children}
            </SyntaxHighlighter>
          ) : (
            // ? Code 언어 선택 안했을 때 코드 구문 스타일 지정
            <SyntaxHighlighter
              style={stackoverflowDark}
              customStyle={{ padding: "1.5rem 1rem" }}
            >
              {children}
            </SyntaxHighlighter>
            // <code>{children}</code>
          );
        },
      }}
    ></ReactMarkdown>
  );
}
