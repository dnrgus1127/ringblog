import React, { useFetch } from "../Hooks/useFetch";
import styled from "styled-components";

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const Comments = styled.h1`
  font-size: 4rem;
`;

const ErrorMessage = styled.div`
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 4rem;
`;

export function Fetch({
  uri,
  options,
  renderSuccess,
  loadingFallback = <Loading />,
  renderError = (error) => (
    <ErrorMessage>{JSON.stringify(error, null, 2)}</ErrorMessage>
  ),
}) {
  const { loading, data, error } = useFetch(uri, options);
  if (error) return renderError(error);
  if (loading) return loadingFallback;
  if (data) return renderSuccess({ data });
}

function Loading() {
  return (
    <LoadingContainer>
      <Comments>로딩중...</Comments>
    </LoadingContainer>
  );
}
