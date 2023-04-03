import React from "react";
import styled from "styled-components";
import PublishButtons from "../../components/WritePosts/PublishButtons";
import PublishSeriesBlock from "../../components/WritePosts/PublishSeriesBlock";
import PublishSettingSection from "../../components/WritePosts/PublishSettingSection";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { timeStamp } from "../../functions/time";
import { domain } from "../../lib/fetch/domain";
import { writeActions } from "../../redux/writeReducer";

const SettingTemplate = styled.div`
  h3 {
    margin-bottom: 1rem;
  }
`;

export default function PublishSetting() {
  const { loggedUser } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const publishData = useSelector((state) => state.write.data);
  const { selectedSeries } = useSelector((state) => state.write);
  const navigate = useNavigate();
  const { edit, postNumber } = useSelector((state) => state.write);

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

  const publishPost = useMutation(async (data) => {
    const response = await fetch(`${domain}/posts`, {
      method: "POST",
      body: JSON.stringify({
        ...data,
        writer: loggedUser.userId,
        createDateTime: timeStamp(),
        lastMdfdDay: timeStamp(),
        seriesId: selectedSeries.id && selectedSeries.id,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      alert("게시글 작성 완료!");
      navigate("/");
    } else {
      alert(response);
    }
  });

  const mdfdPost = useMutation(async (data) => {
    const response = await fetch(`${domain}/posts/${postNumber}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...data,
        lastMdfdDay: timeStamp(),
        seriesId: selectedSeries.id && selectedSeries.id,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      alert("게시글 수정 완료!");
      navigate("/");
    } else {
      alert(response);
    }
  });

  const onCancel = () => {
    dispatch(writeActions.onToggleVisible());
  };

  const uploadThumbNail = async () => {
    const response = await fetch(publishData.thumbnailPath);
    const data = await response.blob();
    // const ext = thumbnailPath.split(".").pop(); // url 구조에 맞게 수정할 것
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
    }

    if (!edit) {
      publishPost.mutateAsync({
        ...publishData,
        thumbnailPath: serverThumbNailPath,
      });
    } else {
      mdfdPost.mutateAsync({
        ...publishData,
        thumbnailPath: serverThumbNailPath,
      });
    }
  };
  return (
    <SettingTemplate>
      <PublishSettingSection title='시리즈 설정'>
        <PublishSeriesBlock />
      </PublishSettingSection>
      <PublishButtons onCancel={onCancel} onConfirm={uploadPost} />
    </SettingTemplate>
  );
}
