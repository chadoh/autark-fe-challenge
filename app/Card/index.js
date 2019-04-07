import React, { useState } from 'react'
import {
  Button,
  Card as AragonCard,
  Field,
  SafeLink,
  Text,
  TextInput,
  theme,
} from '@aragon/ui'
import Markdown from 'react-markdown'
import styled, { css } from 'styled-components'

const Header = styled.header`
  display: flex;
  margin-bottom: 0.5em;

  *:first-child { flex: 1 }
`

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1em;
`

const Hidden = styled.div`
  position: absolute;
  left: -9000em;
  top: -9000em;
`

const ShowOnHover = styled(Hidden)`
  ${Wrap}:hover &, &:focus-within {
    position: initial;
  }
`

const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
`

const Textarea = styled.textarea`
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

const Buttons = styled.div`
  margin-top: 0.5em;
  > * {
    margin-right: 0.5em;
  }
`

export default function Card({ title, body, update }) {
  const [editing, rawSetEditing] = useState(false)
  const [wasEdited, setWasEdited] = useState(false)

  const setEditing = val => {
    if (val) {
      rawSetEditing(true)
    } else {
      rawSetEditing(false)
      setWasEdited(true)
    }
  }

  const Show = () => (
    <React.Fragment>
      <Header style={{borderBottom: `1px solid ${theme.contentBorder}`}}>
        <h2><Text size="xxlarge">{title}</Text></h2>
        <ShowOnHover>
          <Button
            size="small"
            onClick={() => setEditing(true)}
            ref={button => { if (button && wasEdited) button.focus() }}
          >
            edit <Hidden>{title}</Hidden>
          </Button>
        </ShowOnHover>
      </Header>
      <Markdown
        renderers={{ link: ({ children, ...props }) => <SafeLink {...props}>{children}</SafeLink>}}
        source={body}
      />
    </React.Fragment>
  )

  const Edit = () => (
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
        <Button mode="strong" type="submit">Save</Button>
        <Button onClick={() => setEditing(false)}>Cancel</Button>
      </Buttons>
    </Form>
  )

  return (
    <AragonCard height="initial" width="initial">
      <Wrap>
        {editing ? <Edit /> : <Show />}
      </Wrap>
    </AragonCard>
  )
}
