import React from "react";
import { useState } from "react";
import styled from "styled-components";
import media from "../../lib/style/media";

const SearchBoxBlock = styled.div`
  border: 1px solid ${({ theme }) => theme.greyColor};
  display: flex;
  align-items: center;
  padding: 0.3rem 1rem;

  ${media.small} {
    width: 100%;
  }
`;

const SearchIcon = styled.svg`
  width: 1.7rem;
  height: 1.7rem;
  margin-right: 1rem;

  fill: ${({ theme }) => theme.color};
`;

const SearchInput = styled.input`
  height: 3rem;
  font-size: 1.6rem;
`;

export default function SearchBox({ onBlur }) {
  const [text, setText] = useState("");
  return (
    <SearchBoxBlock>
      <SearchIcon
        // ?  돋보기 아이콘

        width='17'
        height='17'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z'
          fillRule='nonzero'
        />
      </SearchIcon>
      <SearchInput
        value={text}
        // ? 검색 후 엔터 누르면 blur되어 포스트 검색 요청
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.target.blur();
          }
        }}
        onBlur={() => {
          onBlur(text);
        }}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder='검색어를 입력하세요...'
      ></SearchInput>
    </SearchBoxBlock>
  );
}
