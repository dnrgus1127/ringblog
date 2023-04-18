import React from "react";
import SeriesItem from "../UserBlog/SeriesItem";

export default function SeriesInPosts({ data }) {
  if (data) {
    if (data._id === undefined) {
      return <></>;
    }
    return <SeriesItem data={data}></SeriesItem>;
  }
}
