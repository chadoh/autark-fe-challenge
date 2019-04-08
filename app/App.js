import React from 'react'
import {
  AppView,
  Button,
  Main,
} from '@aragon/ui'
import Aragon, { providers } from '@aragon/client'
import styled from 'styled-components'
import Sortable from 'react-sortablejs'
import createDatabase, { uuid } from './database'
import Card from './Card'
import Hidden from './Hidden'

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

  sortWidgets = order => {
    db.setData({ "widgets.order": order })
  }

  moveWidgetTo = (id, index) => {
    const { order } = db.fetchData().widgets
    const prevId = order[index]
    order.splice(index, 2, id, prevId)
    db.setData({ "widgets.order": order })
  }

  render () {
    const { widgets } = db.fetchData()
    return (
      <Main>
        <AppView title="Customize Your DAO">
          <Sortable
            tag={Grid}
            onChange={order => this.sortWidgets(order)}
            options={{
              animation: 150,
              handle: ".drag-handle",
              forceFallback: true,
            }}
          >
            {widgets.order.map((id, index) =>
              <Card
                key={id}
                id={id}
                {...widgets.data[id]}
                update={this.updateWidget.bind(null, id)}
                remove={this.removeWidget.bind(null, id)}
                moveUp={index > 0 && this.moveWidgetTo.bind(null, id, index - 1)}
              />
            )}
          </Sortable>
          <div style={{ marginTop: "1em" }}>
            <Button mode="secondary" onClick={this.addWidget}>
              <span aria-hidden="true">+</span>
              Add Another
              <Hidden>Section</Hidden>
            </Button>
          </div>
        </AppView>
      </Main>
    )
  }
}
