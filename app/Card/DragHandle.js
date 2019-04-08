import React from "react"
import styled from "styled-components"

const DragHandle = styled.span.attrs(() => ({
  className: "drag-handle",
}))`
  background: repeating-linear-gradient(
    90deg,
    silver,
    silver 2px,
    transparent 2px,
    transparent 4px
  );
  content: '';
  cursor: move;
  height: 0.5em;
  position: absolute;
  top: 0;
  left: calc(50% - 8px);
  width: 16px;
`

export default DragHandle
