import React, { useContext, useState } from "react";
import { useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import PublishSeriesConfigBtn from "../../components/WritePosts/PublishSeriesConfigBtn";
import PublishSeriesConfigTemp from "../../components/WritePosts/PublishSeriesConfigTemp";
import PublishSeriesCreate from "../../components/WritePosts/PublishSeriesCreate";
import PublishSeriesList from "../../components/WritePosts/PublishSeriesList";
import { Context } from "../../functions/Login/LoginProvider";
import { domain } from "../../lib/fetch/domain";
import { writeActions } from "../../redux/writeReducer";

const PublishSeriesBlock = styled.div``;

export default function PublishSeriesConfig() {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState();
  const { loggedUser } = useContext(Context);

  // 시리즈 리스트 fetch
  const seriesList = useQuery(`seriesList`, async () => {
    const response = await fetch(
      `${domain}/series/byUser?userId=${loggedUser.userId}`
    );
    return response.json();
  });

  // 시리즈 작성
  const createSeries = useMutation(async (data) => {
    const response = await fetch(`${domain}/series/newSeries`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  });

  const onCancel = () => {
    dispatch(writeActions.onToggleSeriesSelect());
  };

  const onConfirm = () => {
    if (!seriesList.data) return;

    const selectedSeries = seriesList.data.find(
      (series) => series._id === selectedId
    );
    dispatch(
      writeActions.selectSeries({
        id: selectedId,
        title: selectedSeries.title,
      })
    );
    dispatch(writeActions.onToggleSeriesSelect());
  };

  const onCreateNewSeries = async (data) => {
    await createSeries.mutateAsync({
      title: data,
      writer: loggedUser.userId,
    });
    seriesList.refetch();
  };

  const serialized = useMemo(() => {
    if (!seriesList.data) return [];
    return seriesList.data;
  }, [seriesList]);

  return (
    <PublishSeriesBlock>
      <PublishSeriesConfigTemp
        button={
          <PublishSeriesConfigBtn
            disableConfirm={!selectedId}
            onCancel={onCancel}
            onConfirm={onConfirm}
          />
        }
      >
        <PublishSeriesCreate onCreateSeries={onCreateNewSeries} />
        <PublishSeriesList
          list={serialized}
          selectedId={selectedId}
          onSelectedId={setSelectedId}
        />
      </PublishSeriesConfigTemp>
    </PublishSeriesBlock>
  );
}
