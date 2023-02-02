import React, { useFetch } from "../Hooks/useFetch";
import styled from "styled-components";

const LoadingContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const Comments = styled.h1`
  font-size: 4rem;
`;

export function Fetch({
  uri,
  renderSucsecc,
  loadingFallback = <Loading />,
  renderError = (error) => <pre>{JSON.stringify(error, null, 2)}</pre>,
}) {
  const { loading, data, error } = useFetch(uri);
  if (loading) return loadingFallback;
  if (error) return renderError(error);
  if (data) return renderSucsecc({ data });
}

function Loading() {
  return (
    <LoadingContainer>
      <Comments>로딩중...</Comments>
    </LoadingContainer>
  );
}
