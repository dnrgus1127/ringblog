import React from "react";
import PublishHasTags from "./PublishHasTags";
import PublishPreview from "./PublishPreview";
import ThumbnailSelector from "./ThumbnailSelector";
import PublishSettingSection from "./PublishSettingSection";

export default function PublishThumbnail() {
  return (
    <div>
      <ThumbnailSelector />

      <PublishSettingSection
        title='소개글'
        description='이 포스트에 대한 간단한 소개글을 작성해 주세요! (500자이하)'
      >
        <PublishPreview />
      </PublishSettingSection>

      <PublishSettingSection
        title='해시태그'
        description='해시태그를 추가하여 내 글을 더 많은 사람들이 보게 할 수 있습니다.'
      >
        <PublishHasTags />
      </PublishSettingSection>
    </div>
  );
}
