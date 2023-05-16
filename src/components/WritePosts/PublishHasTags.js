import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { writeActions } from "../../redux/writeReducer";
import useAlert from "../common/hooks/useAlert";
import CreateHashTag from "../hasTags/CreateHashTag";
import HashTagBlock from "../hasTags/HashTagBlock";

export default function PublishHasTags() {
  const { hashTags } = useSelector((state) => state.write.data);
  const { onToggleAlert } = useAlert();

  const dispatch = useDispatch();

  const delHashTag = (idx) => {
    dispatch(writeActions.delHashTag(idx));
  };

  const addHashTag = (tag_name) => {
    const tagNames = hashTags.map((hashTags) => hashTags.tag_name);
    if (tagNames.includes(tag_name)) {
      return;
    }
    if (tagNames.length > 9) {
      onToggleAlert("태그는 최대 10개까지 작성할 수 있습니다.", true);
      return;
    }

    dispatch(writeActions.addHashTag({ tag_name: tag_name }));
  };

  return (
    <div>
      <CreateHashTag onEnter={addHashTag} />

      <HashTagBlock hashTags={hashTags} onClick={delHashTag} />
    </div>
  );
}
