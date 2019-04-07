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
  componentDidMount() {
    db.addSaveSuccessListener(this.rerender);
  }

  componentWillUnmount() {
    db.removeSaveSuccessListener(this.rerender);
  }

  rerender = () => {
    this.forceUpdate();
  }

  updateWidget = (id, title, body) => {
    db.setData(`widgets.data.${id}`, { title, body })
  }

  render () {
    const { widgets } = db.fetchData()
    return (
      <Main>
        <AppView title="Customize Your DAO">
          <Grid>
            {widgets.order.map(id =>
              <Card
                key={id}
                id={id}
                {...widgets.data[id]}
                update={this.updateWidget.bind(null, id)}
              />
            )}
          </Grid>
        </AppView>
      </Main>
    )
  }
}
