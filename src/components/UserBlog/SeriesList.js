import React from "react";
import Error from "../common/Error/Error";
import SeriesItem from "./SeriesItem";

export default function SeriesList({ data }) {
  if (data.length === 0) {
    return <Error text={"작성된 시리즈가 없습니다."} />;
  }
  return (
    <div>
      {data.map((item, idx) => (
        <SeriesItem key={idx}>{item}</SeriesItem>
      ))}
    </div>
  );
}
