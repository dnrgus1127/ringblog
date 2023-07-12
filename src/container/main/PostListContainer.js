import React, { useCallback, useEffect, useRef, useState } from "react";
import BlogList from "../../components/mainPage/BlogList";
import OrderAndSearch from "../../components/mainPage/OrderAndSearch";
import { useInfiniteQuery } from "react-query";
import GridLayout from "../../components/common/Layout/GridLayOut";
import Error from "../../components/common/Error/Error";
import BlogItemSekeletonList from "../../components/mainPage/BlogItemSekeletonList";
import Loading from "../../components/common/Loading";
import useDebounce from "../../Hooks/lib/useDebounce";

export default function PostListContainer() {
  const [search, setSearch] = useState("");
  const [orderIndex, setOrder] = useState(0);
  const containRef = useRef(null);

  const searchTerm = useDebounce(search, 500);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [`PostList`, searchTerm, orderIndex],
    async ({ pageParam = 0 }) => {
      const response = await fetch(
        `/posts/Infinite?${
          searchTerm && `search=${searchTerm}`
        }&offset=${pageParam}&order=${orderIndex === 0 && `rcmnd`}`
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
      if (!containRef.current) return;
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

  function RenderData() {
    if (error) return <Error text={"데이터 Fetching 에러"} />;
    if (isLoading) return <Loading text='로딩 중' />;
    if (search && data.pages[0].postList.length === 0)
      return <Error text={`"${search}" 검색 결과가 존재하지 않습니다.`} />;
    if (data.pages[0].postList.length === 0)
      return <Error text='포스트가 존재하지 않습니다.' />;
    return (
      <>
        <GridLayout myRef={containRef}>
          <BlogList data={data} />
          {isFetchingNextPage && <BlogItemSekeletonList />}
        </GridLayout>
        {!hasNextPage && <Error text='포스트를 전부 불러왔습니다.' />}
      </>
    );
  }

  return (
    <React.Fragment>
      <OrderAndSearch
        orderIndex={orderIndex}
        setOrder={setOrder}
        setSearch={setSearch}
        search={search}
      />
      <RenderData />
    </React.Fragment>
  );
}
