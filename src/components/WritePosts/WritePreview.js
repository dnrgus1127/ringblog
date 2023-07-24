import React from "react";
import { MarkdownCss } from "../common/markdown/MarkdownCss";
import CustomMD from "../common/markdown/CustomMD";

export default function WritePreview({ data }) {
  return (
    <MarkdownCss>
      <h1 style={{ marginBottom: "6rem" }}>{data.title}</h1>
      <CustomMD>{data.contents}</CustomMD>
    </MarkdownCss>
  );
}
