import { Fragment, FunctionComponent } from 'react'

import { Canvas } from './Canvas'
import { Monitor } from './Monitor'

export const App: FunctionComponent = () => {

  return (
    <Fragment>
      <Canvas />
      <Monitor />
    </Fragment>
  )
}
