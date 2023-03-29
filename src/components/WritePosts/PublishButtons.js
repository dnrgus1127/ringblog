import React from "react";
import { useContext } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Context } from "../../functions/Login/LoginProvider";
import { timeStamp } from "../../functions/time";
import { domain } from "../../lib/fetch/domain";
import { writeActions } from "../../redux/writeReducer";
import { CancelButton, ConfirmButton } from "../common/Button";

const ButtonWrapper = styled.div`
  text-align: end;
`;

export default function PublishButtons() {
  const { loggedUser } = useContext(Context);
  const dispatch = useDispatch();
  const publishData = useSelector((state) => state.write.data);
  const { selectedSeries } = useSelector((state) => state.write);
  const navigate = useNavigate();

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
      dispatch(writeActions.clearData());
      navigate("/");
    } else {
      alert(response);
    }
  });

  const onCancel = () => {
    dispatch(writeActions.onToggleVisible());
  };

  const uploadThumbNail = async () => {
    const response = await fetch(publishData.thumbNailPath);
    const data = await response.blob();
    // const ext = thumbNailPath.split(".").pop(); // url 구조에 맞게 수정할 것
    const filename = publishData.thumbNailPath.split("/").pop() + ".png"; // url 구조에 맞게 수정할 것
    const metadata = { type: `image/png` };
    const imgFile = new File([data], filename, metadata);

    return await publishImg.mutateAsync(imgFile);
  };

  // todo 확장자 리듀서에 저장받도록 수정
  const uploadPost = async () => {
    let serverThumbNailPath;
    if (publishData.thumbNailPath) {
      serverThumbNailPath = await uploadThumbNail();
    }
    if (!serverThumbNailPath) {
    }
    publishPost.mutateAsync({
      ...publishData,
      thumbNailPath: serverThumbNailPath,
    });
  };
  return (
    <ButtonWrapper>
      <CancelButton onClick={onCancel}>취소</CancelButton>
      <ConfirmButton onClick={uploadPost}>글 쓰기</ConfirmButton>
    </ButtonWrapper>
  );
}
