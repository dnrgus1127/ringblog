import React from "react";
import styled from "styled-components";

const SettingSection = styled.div`
  h3 {
    margin-bottom: 1rem;
  }
  margin-bottom: 1rem;
`;
export default function PublishSettingSection({ title, children }) {
  return (
    <SettingSection>
      <h3>{title}</h3>
      {children}
    </SettingSection>
  );
}
