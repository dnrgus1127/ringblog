import React from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import WritePostSettingTemplate from "../../components/WritePosts/WritePostSettingTemplate";
import { writeActions } from "../../redux/writeReducer";
import PublishSeriesConfig from "./PublishSeriesConfig";
import PublishSetting from "./PublishSetting";
import PublishThumbnailContainer from "./PublishThumbnailContainer";

export default function NewPostPublishScreen() {
  const dispatch = useDispatch();
  const { visible, seriesSelect, postNumber } = useSelector(
    (state) => state.write
  );

  const { data: hashTags, isLoading: hashTagsIsLoading } = useQuery(
    ["hashTags", postNumber],
    async () => {
      const response = await fetch(`/write/hashTags?postId=${postNumber}`);
      return response.json();
    }
  );

  useEffect(() => {
    !hashTagsIsLoading && dispatch(writeActions.setHashTag(hashTags));
  }, [hashTags, dispatch, hashTagsIsLoading]);

  return (
    <WritePostSettingTemplate
      visible={visible}
      left={<PublishThumbnailContainer />}
      right={seriesSelect ? <PublishSeriesConfig /> : <PublishSetting />}
    />
  );
}
