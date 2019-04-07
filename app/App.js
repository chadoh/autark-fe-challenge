import React from 'react'
import {
  AppView,
  Button,
  Main,
} from '@aragon/ui'
import Aragon, { providers } from '@aragon/client'
import styled from 'styled-components'
import createDatabase, { uuid } from './database'
import Card from './Card'
import Hidden from './Hidden'

const db = createDatabase();

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(282px, 1fr));
  grid-gap: 1em;
`

const EmptyCard = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
    db.setData({ [`widgets.data.${id}`]: { title, body } })
  }

  removeWidget = id => {
    const { widgets } = db.fetchData()
    delete widgets.data[id]
    db.setData({
      "widgets.data": widgets.data,
      "widgets.order": widgets.order.filter(x => x !== id),
    })
  }

  addWidget = () => {
    const id = uuid()
    const currentOrder = db.fetchData().widgets.order
    db.setData({
      [`widgets.data.${id}`]: {
        title: "More Information",
        body: "Here's more information about our DAO",
        editing: true,
      },
      "widgets.order": [...currentOrder, id],
    })
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
                remove={this.removeWidget.bind(null, id)}
              />
            )}
            <EmptyCard>
              <Button mode="secondary" onClick={this.addWidget}>
                <span aria-hidden="true">+</span>
                Add Another
                <Hidden>Section</Hidden>
              </Button>
            </EmptyCard>
          </Grid>
        </AppView>
      </Main>
    )
  }
}
