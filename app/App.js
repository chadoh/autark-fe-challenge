import React from 'react'
import {
  Main,
} from '@aragon/ui'
import Aragon, { providers } from '@aragon/client'
import styled from 'styled-components'

const Center = styled.div`
  background: lightgray;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default class App extends React.Component {
  render () {
    return (
      <Main>
        <Center>
          Hello World
        </Center>
      </Main>
    )
  }
}
