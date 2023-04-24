import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FullStamp } from "../../../functions/time";

export default function useWrite() {
  const { loggedUser } = useSelector((state) => state.login);
  const { selectedSeries, postNumber } = useSelector((state) => state.write);

  const navigate = useNavigate();

  const { mutate: publish } = useMutation(async (inputData) => {
    let data = inputData;
    data.contents = data.contents.replaceAll('"', '""');

    const response = await fetch(`/write/posts`, {
      method: "POST",
      body: JSON.stringify({
        ...data,
        writer: loggedUser.userId,
        createDateTime: FullStamp(),
        lastMdfdDay: FullStamp(),
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

  const { mutate: modifyPost } = useMutation(async (inputData) => {
    let data = inputData;
    data.contents = data.contents.replaceAll('"', '""');

    const response = await fetch(`/write/posts/${postNumber}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...data,
        lastMdfdDay: FullStamp(),
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

  return { publish, modifyPost };
}
