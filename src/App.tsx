import { Fragment, FunctionComponent } from 'react'

import { Canvas } from './Canvas'
import { Monitor } from './Monitor'
import { Controller } from './Controller'

export const App: FunctionComponent = () => {

  return (
    <Fragment>
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <Canvas />
        </div>
        <div className="col-span-1 bg-neutral-800">
          <Controller />
        </div>
      </div>
      <Monitor />
    </Fragment>
  )
}
