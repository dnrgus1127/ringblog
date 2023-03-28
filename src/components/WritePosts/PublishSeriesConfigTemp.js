import React from "react";
import styled from "styled-components";

const PublishSection = styled.div``;

const SeriesBlock = styled.div`
  margin-bottom: 1rem;
`;

export default function PublishSeriesConfigTemp({ children, button }) {
  return (
    <PublishSection>
      <SeriesBlock>{children}</SeriesBlock>
      {button}
    </PublishSection>
  );
}
