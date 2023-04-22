import React from "react";
import styled from "styled-components";

const HasTagBlock = styled.div`
  padding: 0.3rem 1.3rem;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  display: inline;
  background-color: ${({ theme }) => theme.bgElement3};
  color: ${({ theme }) => theme.btnColor};
  font-weight: 800;
  cursor: pointer;
`;

export default function HasTagItem({ hashTag, onClick }) {
  return <HasTagBlock onClick={onClick}>{hashTag}</HasTagBlock>;
}
