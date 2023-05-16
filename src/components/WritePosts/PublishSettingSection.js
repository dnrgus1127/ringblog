import React, { useRef } from "react";
import styled from "styled-components";
import useBoolean from "../../Hooks/useBoolean";
import ToolTip from "../common/ToolTip";

const SettingSection = styled.div`
  h3 {
    margin-bottom: 0.5rem;
    position: relative;
    display: inline-block;
  }
  margin-bottom: 1rem;
`;

export default function PublishSettingSection({
  title,
  children,
  description = "",
}) {
  const [showNotice, onToggleShowNotice] = useBoolean(false);
  const headingRef = useRef();
  return (
    <SettingSection>
      <h3
        ref={headingRef}
        onMouseOver={onToggleShowNotice}
        onMouseOut={onToggleShowNotice}
      >
        {title}
        {showNotice && (
          <ToolTip
            left={headingRef.current.clientWidth}
            title={title}
            description={description}
          />
        )}
      </h3>
      {children}
    </SettingSection>
  );
}
