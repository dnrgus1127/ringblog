import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import remarkGfm from "remark-gfm";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import { ReloadButton } from "../../Button";

// TODO - 다크모드 아닐 때 SyntaxHighlighter style 추가 필요
export default function CustomMD({ children }) {
  return (
    <ErrorBoundary>
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
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={stackoverflowDark}
                customStyle={{ display: "inline-block" }}
                PreTag='div'
                {...props}
              >
                {/* {children} */}
              </SyntaxHighlighter>
            ) : (
              // ? Code 언어 선택 안했을 때 코드 구문 스타일 지정
              // <SyntaxHighlighter
              //   language='null'
              //   style={stackoverflowDark}
              //   customStyle={{ padding: "1.5rem 1rem" }}
              // >
              //   {children}
              // </SyntaxHighlighter>
              // <code>{children}</code>
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      ></ReactMarkdown>
    </ErrorBoundary>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      return (
        <div
          style={{
            height: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem 0",
          }}
        >
          <div style={{ textAlign: " center" }}>
            <h1>마크다운 HTML 파싱에 실패했습니다.</h1>
            <p style={{ color: "#dd2ede" }}>
              좌측 내용을 수정하고 아래 버튼을 눌러주세요
            </p>
            <ReloadButton
              onClick={() => {
                this.setState({ hasError: false });
              }}
            >
              다시 시도
            </ReloadButton>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
