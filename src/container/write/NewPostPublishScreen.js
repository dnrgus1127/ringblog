import React from "react";
import { useSelector } from "react-redux";
import WritePostSettingTemplate from "../../components/WritePosts/WritePostSettingTemplate";
import PublishSeriesConfig from "../PublishSeriesConfig";
import PublishSetting from "./PublishSetting";
import PublishThumbnailContainer from "./PublishThumbnailContainer";

export default function NewPostPublishScreen({ onOff, onOffEvent }) {
  const { visible, seriesSelect } = useSelector((state) => state.write);

  return (
    <WritePostSettingTemplate
      visible={visible}
      left={<PublishThumbnailContainer />}
      right={seriesSelect ? <PublishSeriesConfig /> : <PublishSetting />}
    />
  );
}
