import React from 'react'
import {
  AppView,
  Main,
} from '@aragon/ui'
import Aragon, { providers } from '@aragon/client'
import styled from 'styled-components'
import createDatabase from './database'
import Card from './Card'

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
    const { widgets } = this.state
    return (
      <Main>
        <AppView title="Customize Your DAO">
          <Grid>
            {widgets.order.map(id =>
              <Card key={id} id={id} {...widgets.data[id]} />
            )}
          </Grid>
        </AppView>
      </Main>
    )
  }
}
