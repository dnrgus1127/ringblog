import { useEffect, useState } from "react";

export function useRcmndCnt(postId, state) {
  const [rcmndCnt, setCnt] = useState();

  // 포스트 총 좋아요 갯수
  useEffect(() => {
    fetch(`/rcmnd/count?postId=${postId}`)
      .then((res) => res.json())
      .then((data) => setCnt(data.count));
  }, [postId, state]);

  return { rcmndCnt };
}
