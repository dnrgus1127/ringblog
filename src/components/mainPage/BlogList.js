import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BlogItem from "./BlogItem";
import Loading from "../Loading";
import SearchBox from "../UserBlog/SearchBox";
import { useInfiniteQuery } from "react-query";
import Error from "../common/Error/Error";
import { useRef } from "react";
import { useCallback } from "react";

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
  const containRef = useRef(null);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [`PostList`, search],
    async ({ pageParam = 0 }) => {
      const response = await fetch(
        `/posts/Infinite?${search && `search=${search}`}&offset=${pageParam}`
      );
      return response.json();
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.nextPage;
      },
      refetchOnWindowFocus: false,
    }
  );

  const handleNextPage = useCallback(() => {
    hasNextPage && fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  useEffect(() => {
    const handleScroll = (event) => {
      const { clientHeight } = containRef.current;
      const { scrollY } = window;
      // 스크롤이 끝에 닿으면 다음 페이지를 가져옵니다.
      if (clientHeight < scrollY + 1000) {
        !isFetchingNextPage && handleNextPage();
      }
    };
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
    }, 100);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleNextPage, isFetchingNextPage]);

  function RenderItems() {
    if (error) return <div>에러</div>;
    if (isLoading) return <Loading text='로딩 중' />;
    if (data.length === 0) {
      return <EmptyData>"{search}" 검색 결과가 존재하지 않습니다.</EmptyData>;
    }
    if (data)
      return (
        <>
          {data.pages.map((page, idx) =>
            page.postList.map((i, idx) => (
              <BlogItem key={idx} idx={idx} data={i} />
            ))
          )}
        </>
      );
  }

  return (
    <React.Fragment>
      <SearchWrap>
        <div className='searchBoxSize'>
          <SearchBox onBlur={setSearch} />
        </div>
      </SearchWrap>
      <GridLayout ref={containRef}>
        <RenderItems />
      </GridLayout>
      {!hasNextPage && <Error text='포스트를 전부 불러왔습니다.' />}
    </React.Fragment>
  );
}
