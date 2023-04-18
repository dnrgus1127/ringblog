import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const ContentNav = styled.ul`
  width: calc(var(--width) * 0.2);
  list-style: none;
  color: ${({ theme }) => theme.greyColor};
  font-size: 1.4rem;
  padding: 0 4%;
  border-left: 1px solid ${({ theme }) => theme.lineColor};
  li {
    cursor: pointer;
  }
  .md-h1,
  .md-h2,
  .md-h3 {
    color: inherit;
    font-weight: 400;
  }
  .md-h1 {
    margin-bottom: 1.5rem;
  }
  .md-h2 {
    margin: 0 2rem;
    margin-bottom: 1rem;
  }
  .md-h3 {
    margin: 0 4rem;
    margin-bottom: 1rem;
  }
`;

export default function MarkdownNav({ mdRef }) {
  const [mdList, setMdList] = useState([]);
  const [nodeList, setNodeList] = useState([]);

  const scrollRef = useRef([]);
  scrollRef.current = nodeList;
  const scrollHeading = (idx) => {
    scrollRef.current[idx].scrollIntoView({
      behavior: "auto",
      block: "center",
      inline: "start",
    });
  };

  //? 헤딩 태그 네비게이션 에 들어갈 헤더 리스트 구하는 Hook
  useEffect(() => {
    let arr = [];
    let nodes = [];
    let list = mdRef.current.children;
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
  }, [mdRef]);

  return (
    <ContentNav>
      {mdList.map((item, idx) => (
        <li
          key={idx}
          className={`md-${item.tag}`}
          onClick={() => {
            scrollHeading(idx);
          }}
        >
          {item.text}
        </li>
      ))}
    </ContentNav>
  );
}
