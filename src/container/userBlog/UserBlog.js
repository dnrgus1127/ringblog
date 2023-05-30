import React from "react";
import { useState } from "react";
import BlogNavigation from "../../components/UserBlog/BlogNavigation";
import BlogContentsProvider from "./BlogContentsProvider";
import UserBlogTemplate from "../../components/UserBlog/UserBlogTemplate";
import { useQuery } from "react-query";
import { useQuery as urlQuery } from '../../functions/urlQuery';
import Loading from "../../components/Loading";
import Error from "../../components/common/Error/Error";

export default function UserBlog() {
  const [navType, setNavType] = useState(0);
  let query = urlQuery();
  const userId = query.get("writer");
  const { data, isLoading, isError } = useQuery(["userProfile", userId], async () => {
    const res = await fetch(`/setting/userProfile?userId=${userId}`);
    return res.json();
  })

  if (isLoading) return <Loading text="로딩중" />
  if (isError) return <Error text="데이터를 불러오는데 실패했습니다" />
  return (
    <UserBlogTemplate blogerName={data.name} blogIntro={data.introdution} blogerId={data.userId} >
      <BlogNavigation navType={navType} setNavType={setNavType} />
      <BlogContentsProvider type={navType} />
    </UserBlogTemplate>
  )
}
