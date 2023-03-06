import React, { useCallback } from "react";
import useCmtLoggedUser from "../../common/Comment/hooks/useCmtLoggedUser";
import Loading from "../../Loading";
import Error from "../../common/Error/Error";

import CommentList from "../../posts/comments/CommentList";
import { useState } from "react";

export default function RecordComments() {
  const [reFetch, setReFetch] = useState();
  const forceUpdate = useCallback(() => setReFetch({}), []);

  const { loading, data, error } = useCmtLoggedUser(reFetch);

  if (loading) return <Loading text={"로딩중"} />;
  if (error) return <div>Error</div>;
  if (data) {
    if (data.length === 0) {
      return <Error text={"작성한 댓글이 없습니다."} icon={"💬"} />;
    }
    return <CommentList data={data} update={forceUpdate} />;
  }
  return <Error text={"로그인이 필요합니다."} />;
}
