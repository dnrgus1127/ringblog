import React, { useCallback, useEffect, useRef, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styled from "styled-components";
import { MarkdownCss } from "../css/MarkdownCss";
import { onlyDate } from "../functions/dateFormat";
import MarkdownNav from "./MarkdownNav";

const Container = styled.div`
  width: calc(var(--width) * 0.65);
  margin: 0 auto;
  position: relative;

  .writerAndWriteDate {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12rem;
  }
  .mdNav {
    position: absolute;
    left: 105%;
  }
  .mdNavPosition {
    position: absolute;
    top: 14rem;
    /* right: calc(var(--width) * -0.25); */
  }

  @media screen and (max-width: 1100px) {
    .mdNavPosition {
      visibility: hidden;
    }
  }
  @media screen and (max-width: 640px) {
    width: var(--width);
  }
`;

const Text = styled.p``;

const Title = styled(Text)`
  font-size: 3em;
  margin-bottom: 8rem;
`;
const Writer = styled(Text)`
  font-size: 1.4rem;
`;

const CreateDate = styled(Text)`
  color: ${({ theme }) => theme.greyColor};
`;

export default function PostContents({ post }) {
  const createDate = onlyDate(post.createDateTime);

  const [data, setData] = useState();
  const markdownRef = useRef({});
  const [mdList, setMdList] = useState([]);
  const [nodeList, setNodeList] = useState([]);
  const [fixed, setfixed] = useState(false);

  const fixedNav = useCallback(() => {
    if (140 >= markdownRef.current.getBoundingClientRect().top) {
      setfixed(true);
    } else {
      setfixed(false);
    }
    console.log(fixed);
  }, [fixed]);

  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener("scroll", fixedNav);
    }, 100);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", fixedNav);
    };
  }, [fixedNav]);

  useEffect(() => {
    fetch(`https://api.github.com/repos/dnrgus1127/portfolio/readme`)
      .then((res) => res.json())
      .then((json) => {
        fetch(json.download_url)
          .then((res) => res.text())
          .then((markdown) => {
            setData(markdown);
          });
      });
  }, []);

  useEffect(() => {
    let arr = [];
    let nodes = [];
    let list = markdownRef.current.children;
    if (list[0]) {
      for (let i = 0; i < list.length; i++) {
        if (
          list[i].localName === "h1" ||
          list[i].localName === "h2" ||
          list[i].localName === "h3"
        ) {
          arr.push({
            text: list[i].innerText,
            tag: list[i].localName,
          });
          nodes.push(list[i]);
        }
      }
      setNodeList([...nodes]);
      setMdList([...arr]);
    }
  }, [data]);

  return (
    <Container>
      <Title as={"h1"}>{post.title}</Title>
      <div className='writerAndWriteDate'>
        <Writer>{post.name}</Writer>
        <CreateDate>{createDate}</CreateDate>
        <div className='mdNav'>
          <div
            className='mdNavPosition'
            style={
              fixed
                ? {
                    position: "fixed",
                  }
                : null
            }
          >
            <MarkdownNav list={mdList} nodes={nodeList} />
          </div>
        </div>
      </div>
      <MarkdownCss ref={markdownRef}>
        <ReactMarkdown>{data}</ReactMarkdown>
      </MarkdownCss>
    </Container>
  );
}
