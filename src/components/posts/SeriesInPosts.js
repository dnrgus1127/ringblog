import React from "react";
import { useFetch } from "../../Hooks/useFetch";
import SeriesItem from "../UserBlog/SeriesItem";

export default function SeriesInPosts({ index }) {
  const { data } = useFetch(`/series/ForPost?postId=${index}`);

  if (data) {
    if (data.series === false) {
      return <></>;
    }
    return <SeriesItem>{data && data}</SeriesItem>;
  }
}
