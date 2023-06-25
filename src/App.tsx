import { Fragment, FunctionComponent, useEffect } from 'react'

import { Canvas } from './Canvas'
import { Controller } from './Controller'

import { ItemCircle } from './classes/ItemCircle'
import { itemsAtom } from './atoms/itemsAtom'
import { getItemsFromAirtable } from './functions/getItemsFromAirtable'
import { collectedItemsAtom } from './atoms/collectedItemsAtom'

export const App: FunctionComponent = () => {
  useEffect(() => {
    getItemsFromAirtable().then(items => {
      const multipliedItems = items.records
        .map(record =>
          Array.from({ length: record.fields.Quantity }).map((_, i) => {
            const id = `prize${record.fields.ID}.${i}`

            if (collectedItemsAtom.get().includes(id)) return null

            if (!record.fields.Check) {
              console.log('Unchecked', record.fields)
              return null
            }

            return new ItemCircle(id, {
              id: record.id,
              name: record.fields.Name,
            })
          })
        )
        .flat()
        .filter((o): o is Exclude<typeof o, null> => o !== null)

      itemsAtom.set(multipliedItems)
    })
  }, [])

  return (
    <Fragment>
      <div className="grid grid-cols-4">
        <div className="col-span-3 bg-neutral-900">
          <Canvas />
        </div>
        <div className="col-span-1 bg-neutral-800">
          <Controller />
        </div>
      </div>
    </Fragment>
  )
}
