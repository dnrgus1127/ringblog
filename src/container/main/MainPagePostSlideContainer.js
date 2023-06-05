import React from "react";
import { useQuery } from "react-query";
import MainPagePostSlide from "../../components/mainPage/MainPagePostSlide";

export default function MainPagePostSlideContainer() {
  const { data, isLoading } = useQuery(["trendingPosts"], async () => {
    const res = await fetch("/post/trendingPosts");
    return res.json();
  });

  if (isLoading) return;
  return <MainPagePostSlide data={data} />;
}
