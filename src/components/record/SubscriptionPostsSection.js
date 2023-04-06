import React from "react";
import { useQuery } from "react-query";
import Loading from "../Loading";
import SubPostList from "./SubPostList";

export default function SubscriptionPostsSection({ userId }) {
  const { data, isLoading } = useQuery(
    ["subscribedPosts", userId],
    async () => {
      const response = await fetch(`/posts/writer?writer=${userId}`);

      return await response.json();
    }
  );

  if (isLoading) return <Loading />;
  return <SubPostList data={data.data} cnt={data.count} />;
}
