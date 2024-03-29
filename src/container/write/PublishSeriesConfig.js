import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PublishSeriesConfigBtn from "../../components/WritePosts/PublishSeriesConfigBtn";
import PublishSeriesConfigTemp from "../../components/WritePosts/PublishSeriesConfigTemp";
import PublishSeriesCreate from "../../components/WritePosts/PublishSeriesCreate";
import PublishSeriesList from "../../components/WritePosts/PublishSeriesList";
import { writeActions } from "../../store/writeReducer";
import useAlert from "../../Hooks/common/useAlert";

const PublishSeriesBlock = styled.div``;

export default function PublishSeriesConfig() {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState();
  const { loggedUser } = useSelector((state) => state.login);
  const { onToggleAlert } = useAlert();
  // 시리즈 리스트 fetch
  const {
    data: seriesList,
    refetch: seriesListRefetch,
    isLoading: seriesListLoading,
  } = useQuery(
    [`seriesList`, loggedUser.userId],
    async () => {
      const response = await fetch(
        `/series/byUser?userId=${loggedUser.userId}`
      );
      return response.json();
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  // 시리즈 작성
  const createSeries = useMutation(async (data) => {
    const response = await fetch(`/series/newSeries`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  });

  const { mutateAsync: checkDuplicateSeries } = useMutation(
    async (seriesName) => {
      const res = await fetch("/series/checkDulicate", {
        method: "POST",
        body: JSON.stringify({
          seriesName: seriesName,
        }),
        headers: { "Content-Type": "application/json" },
      });

      return res.json();
    }
  );

  const onCancel = () => {
    dispatch(writeActions.onToggleSeriesSelect());
  };

  const onConfirm = () => {
    if (!seriesList) return;

    const selectedSeries = seriesList.find(
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
    const result = validSeriesTitle(data);

    if (result) return false;

    const { isDuplicated } = await checkDuplicateSeries(data);

    if (isDuplicated) {
      onToggleAlert("중복된 시리즈 이름입니다.", true);
      return false;
    }

    await createSeries.mutateAsync({
      title: data,
      writer: loggedUser.userId,
    });
    onToggleAlert("시리즈 추가!");
    seriesListRefetch();
    return true;
  };

  const validSeriesTitle = (newTitle) => {
    if (newTitle.length === 0) {
      onToggleAlert("시리즈명은 공백으로 둘 수 없습니다.", true);
      return true;
    } else if (newTitle.length > 20) {
      onToggleAlert("시리즈명은 20자 이하여야 합니다.", true);
      return true;
    }
    return false;
  };

  if (seriesListLoading) return <div></div>;
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
          list={seriesList}
          selectedId={selectedId}
          onSelectedId={setSelectedId}
        />
      </PublishSeriesConfigTemp>
    </PublishSeriesBlock>
  );
}
