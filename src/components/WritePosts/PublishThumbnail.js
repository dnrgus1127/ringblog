import React from "react";
import PublishPreview from "./PublishPreview";
import ThumbnailSelector from "./ThumbnailSelector";

export default function PublishThumbnail() {
  return (
    <div>
      <ThumbnailSelector />
      <PublishPreview />
    </div>
  );
}
