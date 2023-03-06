import React, { useCallback, useState } from "react";
import CommentItem from "./CommentItem";
import styled from "styled-components";
import { ColorButton } from "../../Button";
import PopupOkCancle from "../../common/PopupOkCancle";
import useBoolean from "../../../Hooks/useBoolean";
import useCmtDel from "../../../Hooks/Comments/useCmtDel";

const Container = styled.div``;

const MoreButton = styled(ColorButton)`
  width: 100%;
  background-color: ${({ theme }) => theme.btnColor};
  color: black;
  border-radius: 4px;
  padding: 1rem;
  &:hover {
    transform: none;
  }
`;

export default function CommentList({ data, update }) {
  const [value, setValue] = useState(5);

  const [removeId, setRemoveId] = useState();
  const [askRemove, onToggleRemove] = useBoolean(false);

  const { delCmt } = useCmtDel(update);

  // 확인창 에서 삭제 버튼

  const onDeleteComment = useCallback(() => {
    onToggleRemove();
    delCmt(removeId);
  }, [delCmt, onToggleRemove, removeId]);

  //삭제 버튼 (확인 창 띄우고 삭제 버튼 눌린 removeId를 CommentId로 설정)
  const onDelete = useCallback(
    (id) => {
      setRemoveId(id);
      onToggleRemove();
    },
    [onToggleRemove]
  );

  const list = data.slice(0, value);
  return (
    <Container>
      <p>{data.length}개의 댓글</p>
      {list.map((item, idx) => (
        <CommentItem
          key={idx}
          commentsUpdate={update}
          data={item}
          onDelete={onDelete}
        />
      ))}
      {value < data.length ? (
        <MoreButton
          onClick={() => {
            setValue(value + 5);
          }}
        >
          더 보기
        </MoreButton>
      ) : (
        <div>마지막 댓글입니다.</div>
      )}
      <PopupOkCancle
        visible={askRemove}
        onCancel={onToggleRemove}
        onConfirm={onDeleteComment}
        title={"댓글 삭제"}
      >
        댓글을 정말로 삭제하시겠습니까?
      </PopupOkCancle>
    </Container>
  );
}
