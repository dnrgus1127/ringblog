import React from "react";

import { Fetch } from "../Fetch";

export default function SeriesPosts({ seriesId }) {
  function loadTitles({ data }) {
    return (
      <div>
        {data.map((item, idx) => (
          <div key={idx}>{item.title}</div>
        ))}
      </div>
    );
  }
  return (
    <Fetch
      uri={`/series/postsById?seriesId=${seriesId}`}
      renderSuccess={loadTitles}
    />
  );
}
