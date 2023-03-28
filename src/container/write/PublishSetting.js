import React from "react";
import styled from "styled-components";
import PublishButtons from "../../components/WritePosts/PublishButtons";
import PublishSeriesBlock from "../../components/WritePosts/PublishSeriesBlock";
import PublishSettingSection from "../../components/WritePosts/PublishSettingSection";

const SettingTemplate = styled.div`
  h3 {
    margin-bottom: 1rem;
  }
`;

export default function PublishSetting() {
  return (
    <SettingTemplate>
      <PublishSettingSection title='시리즈 설정'>
        <PublishSeriesBlock />
      </PublishSettingSection>

      <PublishButtons />
    </SettingTemplate>
  );
}
