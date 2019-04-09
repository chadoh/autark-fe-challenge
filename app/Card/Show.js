import React from "react"
import {
  Button,
  SafeLink,
  Text,
} from '@aragon/ui'
import Markdown from "react-markdown"
import Hidden from "../Hidden"
import {
  Header,
  ShowOnHover,
} from "./styled"

const Show = ({ title, body, setEditing, wasEdited }) => (
  <React.Fragment>
    <Header>
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

export default Show
