import React from "react";
import styled from "styled-components";
import PostOrder from "../../container/main/PostOrder";
import SearchBox from "../UserBlog/SearchBox";
import media from "../../lib/style/media";

const SearchWrap = styled.div`
  width: var(--width);
  display: flex;
  margin: 2rem auto;
  justify-content: space-between;

  @media (max-width: 1100px) {
    .searchBoxSize {
      width: 100%;
    }
  }
  ${media.xsmall} {
    flex-direction: column;
    & div:nth-child(1) {
      order: 2;
    }
    & div:nth-child(2) {
      order: 1;
    }
  }
`;

export default function OrderAndSearch({ orderIndex, setOrder, setSearch }) {
  return (
    <SearchWrap>
      <PostOrder buttonIndex={orderIndex} setButtonIndex={setOrder} />
      <div className='searchBoxSize'>
        <SearchBox onBlur={setSearch} />
      </div>
    </SearchWrap>
  );
}
