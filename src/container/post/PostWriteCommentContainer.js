import React from "react";
import PostCommentWrite from "../../components/posts/PostCommentWrite";
import { useMutation } from "react-query";
import { FullStamp } from "../../functions/time";
import useAlert from "../../components/common/hooks/useAlert";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../redux/loginState";
import { postActions } from "../../redux/postState";
import { commentValid } from "../../functions/comments/commentValidation";

export default function PostWriteCommentContainer({ refetchComments, index }) {
  const { onToggleAlert } = useAlert();
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.login);
  const { newComment } = useSelector((state) => state.post);

  const logout = () => {
    dispatch(loginActions.setLogout());
  };

  const setNewcomment = (e) => {
    if (commentValid(e.target.value)) {
      dispatch(postActions.setNewComment(e.target.value));
    } else {
      onToggleAlert("!@#$%^&*를 제외한 특수문자를 입력할 수 없습니다.", true);
    }
  };

  const { mutateAsync: writeComment } = useMutation(
    "writeComment",
    async () => {
      const response = await fetch(`/comments`, {
        method: "POST",
        body: JSON.stringify({
          comments: newComment,
          userId: loggedUser.userId,
          createTime: FullStamp(),
          postId: index,
        }),
        headers: { "Content-Type": "application/json" },
      });

      // 로그인 만료 시
      if (response.status === 401) {
        logout();
        onToggleAlert("다시 로그인해 주세요", true);
        return;
      } else if (response.status === 403) {
        onToggleAlert("비 정상적인 접근입니다.", true);
        return;
      } else {
        // 코멘트 초기화
        dispatch(postActions.setNewComment(""));
        onToggleAlert("댓글을 작성했습니다.");
      }
    }
  );

  const submit = async (e) => {
    e.preventDefault();
    await writeComment();
    refetchComments();
  };

  return (
    <PostCommentWrite
      onWrite={submit}
      onChange={setNewcomment}
      comment={newComment}
      loggedUsername={loggedUser.username}
    />
  );
}
