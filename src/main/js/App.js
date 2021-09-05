import { Container } from '@material-ui/core'
import React from 'react'
import Notifications from './components/Notifications'
import ProcessorList from './components/ProcessorList'

const App = () => {

  return (
    <>
      <Notifications />
      <Container>
        <ProcessorList/>
      </Container>
    </>
  )
}

export default App
