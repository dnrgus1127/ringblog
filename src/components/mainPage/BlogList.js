import React, { useState } from "react";
import styled from "styled-components";
import BlogItem from "./BlogItem";
import Search from "../common/Search";
import { useGetPost } from "./hook/useGetPost";
import Loading from "../Loading";

const GridLayout = styled.div`
  width: var(--width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(30px, 414px);
  grid-gap: 3.2rem;

  @media (min-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(30px, 390px);
  }
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(30px, 460px);
  }
  @media (max-width: 832px) {
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: minmax(30px, 500px);
  }
  @media (max-width: 640px) {
    grid-auto-rows: minmax(30px, 408px);
    grid-template-columns: repeat(1, 1fr);
  }
`;

const SearchWrap = styled.div`
  width: var(--width);
  display: flex;
  margin: 2rem auto;
  justify-content: end;

  @media (max-width: 1100px) {
    .searchBoxSize {
      width: 100%;
    }
  }
`;

const EmptyData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  height: 50vh;

  @media (max-width: 640px) {
    font-size: 1.6rem;
  }
`;

export default function BlogList() {
  const [search, setSearch] = useState("");
  const { data, loading, error } = useGetPost(search);

  function BlogItems() {
    if (error) return <div>에러</div>;
    if (loading) return <Loading text='로딩 중' />;
    if (data.length === 0) {
      return <EmptyData>"{search}" 검색 결과가 존재하지 않습니다.</EmptyData>;
    }
    if (data)
      return (
        <GridLayout>
          {data.map((i, idx) => (
            <BlogItem key={idx} idx={idx} data={i} />
          ))}
        </GridLayout>
      );
  }

  return (
    <React.Fragment>
      <SearchWrap>
        <div className='searchBoxSize'>
          <Search onBlur={setSearch} />
        </div>
      </SearchWrap>
      <BlogItems />
    </React.Fragment>
  );
}
