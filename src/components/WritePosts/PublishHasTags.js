import React from "react";
import { useSelector } from "react-redux";
import HashTagBlock from "../hasTags/HashTagBlock";

export default function PublishHasTags() {
  const { hashTags } = useSelector((state) => state.write.data);
  return (
    <div>
      <HashTagBlock hashTags={hashTags} />
    </div>
  );
}
