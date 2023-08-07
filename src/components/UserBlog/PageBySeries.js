import React from "react";

import SeriesList from "./SeriesList";
import { useQuery } from "react-query";

import { useSearchParams } from "react-router-dom";
import Loading from "../common/Loading";

export default function PageBySeries() {
  const [searchParms] = useSearchParams();
  const writer = searchParms.get("writer");

  const { data, refetch, isLoading } = useQuery(
    ["mySereis", writer],
    async () => {
      const res = await fetch(`/series/byUser?userId=${writer}`);

      return res.json();
    }
  );

  if (isLoading) return <Loading text='시리즈' />;
  return <SeriesList data={data} refresh={refetch} />;
}
