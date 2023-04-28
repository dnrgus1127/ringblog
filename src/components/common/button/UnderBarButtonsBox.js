import React from "react";
import styled, { keyframes } from "styled-components";

const UnderBarBox = styled.div`
  margin: auto 0;
`;

const BounceFrame = (props) => keyframes`
    
    60% {
        margin-left: ${`${
          (props.selected * 100) / props.count + props.bounce
        }%`};

    }
    80% {
        margin-left: ${`${
          (props.selected * 100) / props.count + props.bounce
        }%`};

    }
    100% {
        margin-left: ${`${(props.selected * 100) / props.count}%`};

    }
`;

const UnderBar = styled.div`
  width: ${(props) => `${100 / props.count}%`};
  height: 2px;
  background-color: ${({ theme }) => theme.btnColor};
  margin-left: ${(props) => `${(props.selected * 100) / props.count}%`};

  transition: all 0.15s ease-in-out;
  animation: ${(props) => BounceFrame(props)} 0.15s 0.15s;
`;

export default function UnderBarButtonsBox({
  children,
  selected = 0,
  prevSelected = 0,
  underBar = (
    <UnderBar
      count={children.length}
      selected={selected}
      bounce={prevSelected > selected ? -3 : 3}
    />
  ),
}) {
  return (
    <>
      <UnderBarBox>
        <div>{children}</div>
        {underBar}
      </UnderBarBox>
    </>
  );
}
