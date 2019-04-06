import React from 'react'
import {
  Card as AragonCard,
  SafeLink,
  Text,
} from '@aragon/ui'
import Markdown from 'react-markdown'

export default function Card({id, title, body}) {
  return (
    <AragonCard height="initial" width="initial">
      <div style={{padding: "1em"}}>
        <h2><Text size="xxlarge">{title}</Text></h2>
        <Markdown
          renderers={{ link: ({ children, ...props }) => <SafeLink {...props}>{children}</SafeLink>}}
          source={body}
        />
      </div>
    </AragonCard>
  )
}
