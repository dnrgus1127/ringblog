import React, { useRef } from "react";
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

export default function MarkdownNav({ list, nodes }) {
  const scrollRef = useRef([]);
  scrollRef.current = nodes;
  const scrollHeading = (idx) => {
    scrollRef.current[idx].scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  };

  return (
    <ContentNav>
      {list.map((item, idx) => (
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
