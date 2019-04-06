import React from 'react'
import {
  Card as AragonCard,
  Text,
} from '@aragon/ui'

export default function Card({id, title, body}) {
  return (
    <AragonCard height="initial" width="initial">
      <div style={{padding: "1em"}}>
        <h2><Text size="xxlarge">{title}</Text></h2>
        {body}
      </div>
    </AragonCard>
  )
}
