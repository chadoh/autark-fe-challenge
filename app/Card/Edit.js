import React, { useState } from 'react'
import {
  Button,
  Field,
  TextInput,
} from '@aragon/ui'
import Hidden from "../Hidden"
import {
  Header,
  ShowOnFocus,
  Form,
  Textarea,
  Buttons,
} from "./styled"

const Edit = ({
  body,
  moveUp,
  remove,
  setEditing,
  setWasMoved,
  title,
  update,
  wasMoved,
}) => (
  <Form
    onSubmit={e => {
      e.preventDefault()
      const { title, body } = e.target.elements
      update(title.value, body.value)
      setEditing(false)
    }}
    onKeyDown={e => {
      if (e.key === "Escape") {
        setEditing(false)
      }
    }}
  >
    <Header>
      <Hidden>
        <h2>Edit {title}</h2>
        <label htmlFor="title">Title</label>
      </Hidden>
      <TextInput
        wide
        defaultValue={title}
        id="title"
        name="title"
        autoComplete="off"
        autoFocus
      />
    </Header>
    <Hidden>
      <label htmlFor="body">Body</label>
    </Hidden>
    <Textarea defaultValue={body} id="body" name="body" />
    <Buttons>
      <Button size="small" mode="strong" type="submit">Save</Button>
      <Button size="small" onClick={() => setEditing(false)}>Cancel</Button>
      {moveUp &&
        <ShowOnFocus>
          <Button
            size="small"
            onClick={() => {
              moveUp()
              setWasMoved(true)
            }}
            ref={button => {
              if (button && wasMoved) {
                // set timeout to allow reorder rendering to finish
                setTimeout(() => { button.focus() })
              }
            }}
            title="Move Up"
          >
            <span aria-hidden="true">^</span>
            <Hidden>Move Up</Hidden>
          </Button>
        </ShowOnFocus>
      }
      <Button
        size="small"
        mode="strong"
        emphasis="negative"
        onClick={() => {
          if (confirm(`Delete "${title}"? This cannot be undone.`)) {
            remove()
          }
        }}
      >
        delete
      </Button>
    </Buttons>
  </Form>
)

export default Edit
