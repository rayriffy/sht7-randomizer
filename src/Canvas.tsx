import { FunctionComponent } from 'react'
import Sketch, { SketchProps } from 'react-p5'

import { ItemCircle } from './classes/ItemCircle'
import { PlayerCircle } from './classes/PlayerCircle'

import { playAtom } from './atoms/playAtom'
import { playersAtom } from './atoms/playersAtom'

let canvasWidthRatio = 3 / 4

export const Canvas: FunctionComponent = () => {
  let items: ItemCircle[] = []

  const setup: SketchProps['setup'] = (p5, canvasParentRef) => {
    p5.createCanvas(
      document.body.clientWidth * canvasWidthRatio,
      document.body.clientHeight
    ).parent(canvasParentRef)

    Array.from({ length: 130 }).map(() => {
      items.push(
        new ItemCircle(document.body.clientWidth * canvasWidthRatio, document.body.clientHeight, {
          name: 'demoitem',
        })
      )
    })
  }

  const draw: SketchProps['draw'] = p5 => {
    p5.background(0)

    items.forEach(item => {
      item.render(p5)
    })

    playersAtom.get().forEach(player => {
      if (playAtom.get())
        player.update()
      player.render(p5)
    })
  }

  const mouseClicked: SketchProps['mouseClicked'] = (_, event) => {
    interface ForgedClickEvent {
      type: string
      x: number
      y: number
    }

    let forgedEvent = event as unknown as ForgedClickEvent

    if (forgedEvent.type === 'click') {
      playersAtom.set([
        ...playersAtom.get(),
        new PlayerCircle(
          forgedEvent.x,
          forgedEvent.y,
          `Player ${playersAtom.get().length}`,
          items
        )
      ])
    }
  }

  return <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />
}
