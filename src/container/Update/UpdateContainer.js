import React from "react";
import UpdateNoteItem from "../../components/Update/UpdateNoteItem";

const MOCK_UPDATE_NOTE = [
  {
    id: 1,
    version: "1.0.1",
    note: "뭐시기를 추가했습니다.",
  },
  {
    id: 2,
    version: "1.0.2",
    note: "뭐시기를 추가했습니다.",
  },
  {
    id: 3,
    version: "1.0.3",
    note: "### 추가했습니다.",
  },
];

export default function UpdateContainer() {
  return (
    <div>
      <h2>패치 노트</h2>
      {MOCK_UPDATE_NOTE.map((item, idx) => {
        return <UpdateNoteItem data={item} />;
      })}
    </div>
  );
}
