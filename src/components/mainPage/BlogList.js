import React from "react";
import PostCard from "./PostCard";

export default function BlogList({ data }) {
  return (
    <>
      {data.pages.map((page, idx) =>
        page.postList.map((i, idx) => <PostCard key={idx} idx={idx} data={i} />)
      )}
    </>
  );
}
