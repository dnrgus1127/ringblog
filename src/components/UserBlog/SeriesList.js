import React, { useState } from "react";
import { useCallback } from "react";
import useBoolean from "../../Hooks/useBoolean";
import Error from "../common/Error/Error";
import SeriesItem from "./SeriesItem";
import SeriesMdfd from "./SeriesMdfd";

export default function SeriesList({ data, refresh }) {
  const [openSeriesMdfd, onToggleOpenSM] = useBoolean(false);
  const [updateSeriesId, setUpdateSeriesId] = useState();

  const onClickMdfd = useCallback(
    (id) => {
      setUpdateSeriesId(id);
      onToggleOpenSM();
    },
    [onToggleOpenSM]
  );

  if (data.length === 0) {
    return <Error text={"작성된 시리즈가 없습니다."} />;
  }
  return (
    <div>
      {data.map((item, idx) => (
        <SeriesItem
          key={idx}
          isBlog={true}
          refresh={refresh}
          mdfd={() => {
            onClickMdfd(idx);
          }}
        >
          {item}
        </SeriesItem>
      ))}
      {openSeriesMdfd ? (
        <SeriesMdfd
          close={onToggleOpenSM}
          data={data[updateSeriesId]}
          refresh={refresh}
        />
      ) : null}
    </div>
  );
}
