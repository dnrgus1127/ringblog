import React from "react";
import PublishHasTags from "./PublishHasTags";
import PublishPreview from "./PublishPreview";
import ThumbnailSelector from "./ThumbnailSelector";

export default function PublishThumbnail() {
  return (
    <div>
      <ThumbnailSelector />
      <PublishPreview />
      <PublishHasTags />
    </div>
  );
}
