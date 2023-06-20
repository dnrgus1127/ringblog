import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import Loading from "../Loading";
import SubPostList from "./SubPostList";
import useAlert from "../../Hooks/common/useAlert";

// 보여지는 포스트 수
const limit = 3;

export default function SubscriptionPostsSection({ userId, order }) {
  const { onToggleAlert } = useAlert();
  const [pageIndex, setPageIndex] = useState(0);
  const fetchSubscribedPosts = async ({ pageParam = 0 }) => {
    const response = await fetch(
      `/posts/writer?writer=${userId}&page=${pageParam}&limit=${limit}&order=${order}`
    );
    const result = await response.json();
    return result;
  };
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(["subscribedPosts", userId, order], fetchSubscribedPosts, {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.count <= 3 * lastPage.nextPage) return null;
        if (lastPage.nextPage) {
          return lastPage.nextPage;
        } else {
          return null;
        }
      },
      staleTime: 60000,
    });

  const handlepage = () => {
    if (isFetchingNextPage) return;
    if (!data.pages[pageIndex + 1]) {
      hasNextPage
        ? fetchNextPage()
        : onToggleAlert("마지막 포스트입니다.", true);
      hasNextPage && setPageIndex((prev) => prev + 1);
    } else {
      setPageIndex((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    setPageIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  useEffect(() => {
    setPageIndex(0);
  }, [order]);

  if (isLoading || isFetchingNextPage) return <Loading />;
  if (!data.pages[pageIndex]) return;
  return (
    <SubPostList
      data={data.pages[pageIndex]}
      nextPage={handlepage}
      prevPage={prevPage}
    />
  );
}
