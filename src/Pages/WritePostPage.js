import React from "react";
import { useEffect } from "react";
import { useQuery as urlQuery } from "../lib/urlQuery";
import { useNavigate } from "react-router-dom";
import NewPostPublishScreen from "../container/write/NewPostPublishScreen";
import { useDispatch, useSelector } from "react-redux";
import { writeActions } from "../store/writeReducer";
import PostEditor from "../components/WritePosts/PostEditor";
import { useQuery } from "react-query";
import Loading from "../components/common/Loading";
import WriteTemplate from "../components/WritePosts/WriteTemplate";
import WritePreview from "../components/WritePosts/WritePreview";

export default function WritePostPage() {
  let query = urlQuery();
  const { postNumber, edit, onMobilePreview } = useSelector(
    (state) => state.write
  );
  const postData = useSelector((state) => state.write.data);
  const { loggedIn } = useSelector((state) => state.login);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  // useLogin();
  // // 로그인 검증
  // TODO 수정 시 로그인한 유저와 작성자가 일치하는지 확인
  useEffect(() => {
    if (!loggedIn) {
      navigation("/");
    }
  }, [loggedIn, navigation]);

  useEffect(() => {
    window.onbeforeunload = (e) => {
      return 0;
    };
  }, [navigation]);

  useEffect(() => {
    return () => {
      dispatch(writeActions.clearData());
    };
  }, [dispatch]);

  //uri에 인덱스 쿼리스트링 존재하면 수정으로 판단
  useEffect(() => {
    const index = query.get("index");
    if (index) {
      dispatch(writeActions.setEdit(index));
    }
  }, [dispatch, query]);

  // 수정 시 포스트 정보 불러옴
  const { data, isLoading } = useQuery(
    ["postDataQuery", postNumber],
    async () => {
      const response = await fetch(`/posts/${postNumber}`);
      return await response.json();
    },
    {
      refetchOnWindowFocus: false,
      enabled: postNumber > 0,
    }
  );

  const seriesQuery = useQuery(
    "series",
    async () => {
      const response = await fetch(`/series/ForPost?postId=${postNumber}`);
      return response.json();
    },
    {
      refetchOnWindowFocus: false,

      enabled: postNumber > 0,
    }
  );

  useEffect(() => {
    if (seriesQuery.data) {
      dispatch(
        writeActions.selectSeries({
          id: seriesQuery.data._id,
          title: seriesQuery.data.title,
        })
      );
    }
  }, [seriesQuery.data, dispatch]);

  // redux store 에 불러온 포스트 정보 저장
  // useQuery onSuccess 내부에서 dispatch 실행 시 입력한 데이터가 날라가는 문제가 있어서 useEffect로 분리하였음
  useEffect(() => {
    // 수정중이고 데이터가 불러와졌다면
    if (data && edit) {
      dispatch(writeActions.setData({ ...data }));
    }
  }, [data, dispatch, edit]);

  return (
    <WriteTemplate
      order={onMobilePreview ? "right" : "left"}
      left={<PostEditor />}
      right={<WritePreview data={postData} />}
    >
      {isLoading && <Loading text={"로딩중"} />}
      <NewPostPublishScreen />
    </WriteTemplate>
  );
}
