import React, { useEffect, useRef, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styled from "styled-components";
import { MarkdownCss } from "../css/MarkdownCss";
import { onlyDate } from "../functions/dateFormat";

const Container = styled.div`
  width: var(--width);
  height: 40vh;
  margin: 0 auto;

  .writerAndWriteDate {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12rem;
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

const ContentNav = styled.ul`
  list-style: none;
  .md-h1 {
    margin: 1rem 0;
  }
  .md-h2 {
    margin: 1rem 2rem;
  }
  .md-h3 {
    margin: 1rem 4rem;
  }
`;

export default function PostContents({ post }) {
  const createDate = onlyDate(post.createDateTime);

  const [data, setData] = useState();
  const markdownRef = useRef({});
  const [mdList, setMdList] = useState([]);

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
    let list = markdownRef.current.children;
    if (list[0]) {
      console.log(list[0].innerText);
      console.log(list);

      for (let i = 0; i < list.length; i++) {
        if (
          list[i].localName === "h1" ||
          list[i].localName === "h2" ||
          list[i].localName === "h3"
        ) {
          arr.push({ text: list[i].innerText, tag: list[i].localName });
        }
      }
      setMdList([...arr]);
    }
  }, [data]);

  return (
    <Container>
      <Title as={"h1"}>{post.title}</Title>
      <div className='writerAndWriteDate'>
        <Writer>{post.name}</Writer>
        <CreateDate>{createDate}</CreateDate>
      </div>
      <MarkdownCss ref={markdownRef}>
        <ReactMarkdown>{data}</ReactMarkdown>
      </MarkdownCss>
      <ContentNav>
        {mdList.map((item, idx) => (
          <li key={idx} className={`md-${item.tag}`}>
            {item.text}
          </li>
        ))}
      </ContentNav>
    </Container>
  );
}
