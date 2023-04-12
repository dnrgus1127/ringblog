import React from "react";
import styled from "styled-components";
import PublishButtons from "../../components/WritePosts/PublishButtons";
import PublishSeriesBlock from "../../components/WritePosts/PublishSeriesBlock";
import PublishSettingSection from "../../components/WritePosts/PublishSettingSection";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";

import { domain } from "../../lib/fetch/domain";
import { writeActions } from "../../redux/writeReducer";
import PublishPermissionBlock from "../../components/WritePosts/PublishPermissionBlock";
import useWrite from "../../components/WritePosts/hooks/useWrite";

const SettingTemplate = styled.div`
  h3 {
    margin-bottom: 1rem;
  }
`;

export default function PublishSetting() {
  const dispatch = useDispatch();
  const publishData = useSelector((state) => state.write.data);
  const { edit } = useSelector((state) => state.write);

  const { publish, modifyPost } = useWrite();

  //썸네일 이미지 서버에 저장
  const publishImg = useMutation(async (file) => {
    const formData = new FormData();
    formData.append("img", file);
    const response = await fetch(`${domain}/imgUpload`, {
      method: "POST",
      body: formData,
    });
    return response.json();
  });

  const onCancel = () => {
    dispatch(writeActions.onToggleVisible());
  };

  const uploadThumbNail = async () => {
    // ChatGPT 참고
    const response = await fetch(publishData.thumbnailPath);
    const data = await response.blob();
    const filename = publishData.thumbnailPath.split("/").pop() + ".png"; // url 구조에 맞게 수정할 것
    const metadata = { type: `image/png` };
    const imgFile = new File([data], filename, metadata);

    return await publishImg.mutateAsync(imgFile);
  };

  // todo 확장자 리듀서에 저장받도록 수정
  const uploadPost = async () => {
    let serverThumbNailPath;
    if (publishData.thumbnailPath) {
      serverThumbNailPath = await uploadThumbNail();
    }
    if (!serverThumbNailPath) {
      //왜 추가한거지?
    }

    if (!edit) {
      publish({
        ...publishData,
        thumbnailPath: serverThumbNailPath,
      });
    } else {
      //수정
      modifyPost({
        ...publishData,
        thumbnailPath: serverThumbNailPath,
      });
    }
  };
  return (
    <SettingTemplate>
      <PublishSettingSection title='읽기 권한'>
        <PublishPermissionBlock />
      </PublishSettingSection>
      <PublishSettingSection title='시리즈 설정'>
        <PublishSeriesBlock />
      </PublishSettingSection>
      <PublishButtons onCancel={onCancel} onConfirm={uploadPost} />
    </SettingTemplate>
  );
}
