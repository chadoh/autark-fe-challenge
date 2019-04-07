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
import styled from 'styled-components'

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

const HiddenButton = styled(Button)`
  position: absolute;
  left: -9000em;
  top: -9000em;

  ${Wrap}:hover & {
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
  border-radius: 3px;
  border: 1px solid ${theme.contentBorder};

  &:focus {
    border-color: ${theme.contentBorderActive};
    outline: none;
  }
`

export default function Card({ title, body, update }) {
  const [editing, setEditing] = useState(false)

  const Show = () => (
    <React.Fragment>
      <Header style={{borderBottom: `1px solid ${theme.contentBorder}`}}>
        <h2><Text size="xxlarge">{title}</Text></h2>
        <HiddenButton
          size="small"
          onClick={() => setEditing(true)}
        >
          edit
        </HiddenButton>
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
    >
      <Header>
        <TextInput wide defaultValue={title} name="title" />
        <Button mode="strong" type="submit">Save</Button>
        <Button onClick={() => setEditing(false)}>Cancel</Button>
      </Header>
      <Textarea defaultValue={body} name="body" />
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
