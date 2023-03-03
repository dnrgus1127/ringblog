import React, { useFetch } from "../Hooks/useFetch";
import styled from "styled-components";
import Loading from "./Loading";

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
  loadingFallback = <Loading text={"로딩 중"} />,
  renderError = (error) => (
    <ErrorMessage>{JSON.stringify(error, null, 2)}</ErrorMessage>
  ),
}) {
  const { loading, data, error } = useFetch(uri, options);
  if (error) return renderError(error);
  if (loading) return loadingFallback;
  if (data) return renderSuccess({ data });
}
