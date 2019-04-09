import React, { useState } from 'react'
import styled from 'styled-components'
import { theme } from '@aragon/ui'
import Hidden from "../Hidden"

export const DragHandle = styled.span.attrs(() => ({
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

export const Header = styled.header`
  border-bottom: 1px solid ${theme.contentBorder};
  display: flex;
  margin-bottom: 0.5em;

  *:first-child { flex: 1 }
`

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1em;
  position: relative;
`

export const ShowOnFocus = styled(Hidden)`
  &:focus-within {
    position: initial;
  }
`

export const ShowOnHover = styled(ShowOnFocus)`
  ${Wrap}:hover & {
    position: initial;
  }
`

export const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
`

export const Textarea = styled.textarea`
  flex: 1;
  width: 100%;
  min-height: 200px;
  border-radius: 3px;
  border: 1px solid ${theme.contentBorder};

  &:focus {
    border-color: ${theme.contentBorderActive};
    outline: none;
  }
`

export const Buttons = styled.div`
  margin-top: 0.5em;
  display: flex;
  > * {
    margin-right: 0.5em;
    &:last-child {
      margin-right: 0;
      margin-left: auto;
    }
  }
`

