import React from "react";
import useCmtLoggedUser from "../../common/Comment/hooks/useCmtLoggedUser";
import Loading from "../../Loading";
import Error from "../../common/Error/Error";
import CommentList from "../../posts/comments/CommentList";
import { useSelector } from "react-redux";

export default function RecordComments() {
  const { loggedIn } = useSelector((state) => state.login);

  const { data: CmtList, isLoading, isError, refetch } = useCmtLoggedUser();
  //로그인 검증 추가 필요

  if (!loggedIn) return <Error text={"로그인이 필요합니다."} />;

  if (isLoading) return <Loading text={"로딩중"} />;
  if (isError) return <Error text='데이터 에러' />;

  if (CmtList.length === 0) {
    return <Error text={"작성한 댓글이 없습니다."} icon={"💬"} />;
  }
  return <CommentList data={CmtList} update={refetch} />;
}
