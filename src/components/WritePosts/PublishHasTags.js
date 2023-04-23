import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { writeActions } from "../../redux/writeReducer";
import CreateHashTag from "../hasTags/CreateHashTag";
import HashTagBlock from "../hasTags/HashTagBlock";

export default function PublishHasTags() {
  const { hashTags } = useSelector((state) => state.write.data);

  const dispatch = useDispatch();

  const delHashTag = (idx) => {
    dispatch(writeActions.delHashTag(idx));
  };

  const addHashTag = (tag_name) => {
    dispatch(writeActions.addHashTag({ tag_name: tag_name }));
  };

  return (
    <div>
      <CreateHashTag onEnter={addHashTag} />
      <HashTagBlock hashTags={hashTags} onClick={delHashTag} />
    </div>
  );
}
