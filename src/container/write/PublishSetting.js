import React from "react";
import styled from "styled-components";
import PublishButtons from "../../components/WritePosts/PublishButtons";
import PublishSeriesBlock from "../../components/WritePosts/PublishSeriesBlock";
import PublishSettingSection from "../../components/WritePosts/PublishSettingSection";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { writeActions } from "../../store/writeReducer";
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
    const response = await fetch(`/imgUpload`, {
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

  // TODO 확장자 리듀서에 저장받도록 수정
  const uploadPost = async () => {
    let serverThumbNailPath;
    if (publishData.thumbnailPath) {
      serverThumbNailPath = await uploadThumbNail();
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
      <PublishSettingSection
        title='읽기 권한'
        description='비공개 선택 시 나만 포스트를 읽을수 있어요'
      >
        <PublishPermissionBlock />
      </PublishSettingSection>
      <PublishSettingSection
        title='시리즈 설정'
        description='포스트를 시리즈에 추가하여 모아보거나 이어서 볼수 있습니다.'
      >
        <PublishSeriesBlock />
      </PublishSettingSection>
      <PublishButtons onCancel={onCancel} onConfirm={uploadPost} />
    </SettingTemplate>
  );
}
