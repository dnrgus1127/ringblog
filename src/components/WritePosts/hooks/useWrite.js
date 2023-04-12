import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { timeStamp } from "../../../functions/time";

export default function useWrite() {
  const { loggedUser } = useSelector((state) => state.login);
  const { selectedSeries, postNumber } = useSelector((state) => state.write);

  const navigate = useNavigate();

  const { mutate: publish } = useMutation(async (data) => {
    const response = await fetch(`/posts`, {
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

  const { mutate: modifyPost } = useMutation(async (data) => {
    const response = await fetch(`/posts/${postNumber}`, {
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

  return { publish, modifyPost };
}
