import React from 'react'
import {
  AppView,
  Card,
  Main,
  Text,
} from '@aragon/ui'
import Aragon, { providers } from '@aragon/client'
import styled from 'styled-components'

const db = {
  widgets: {
    data: {
      manifesto: {
        title: "Manifesto",
        body: `The history of all hitherto existing society is the history of class struggles.

Freeman and slave, patrician and plebeian, lord and serf, guild-master and journeyman, in a word, oppressor and oppressed, stood in constant opposition to one another, carried on an uninterrupted, now hidden, now open fight, a fight that each time ended, either in a revolutionary reconstitution of society at large, or in the common ruin of the contending classes.`,
      },
      values: {
        title: "Values",
        body: `1. Individuals and interactions over processes and tools
2. Working software over comprehensive documentation
3. Customer collaboration over contract negotiation
4. Responding to change over following a plan`
      },
      coc: {
        title: "Code of Conduct",
        body: `## Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, sex characteristics, gender identity and expression,
level of experience, education, socio-economic status, nationality, personal
appearance, race, religion, or sexual identity and orientation.`,
      },
      contact: {
        title: "Contact Info",
        body: "[@chadoh](https://twitter.com/chadoh)",
      }
    },
    order: ["manifesto", "values", "coc", "contact"],
  }
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(282px, 1fr));
  grid-gap: 1em;
`

export default class App extends React.Component {
  render () {
    return (
      <Main>
        <AppView title="Customize Your DAO">
          <Grid>
            {db.widgets.order.map(id => {
              const { title, body } = db.widgets.data[id]
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
