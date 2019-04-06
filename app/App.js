import React from 'react'
import {
  AppView,
  Card,
  Main,
  Text,
} from '@aragon/ui'
import Aragon, { providers } from '@aragon/client'
import styled from 'styled-components'
import createDatabase from './database'

const db = createDatabase();

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(282px, 1fr));
  grid-gap: 1em;
`

export default class App extends React.Component {
  state = {
    widgets: db.fetchData().widgets
  }
  render () {
    return (
      <Main>
        <AppView title="Customize Your DAO">
          <Grid>
            {this.state.widgets.order.map(id => {
              const { title, body } = this.state.widgets.data[id]
              return (
                <Card key={id} height="initial" width="initial">
                  <div style={{padding: "1em"}}>
                    <h2><Text size="xxlarge">{title}</Text></h2>
                    {body}
                  </div>
                </Card>
              )
            })}
          </Grid>
        </AppView>
      </Main>
    )
  }
}
