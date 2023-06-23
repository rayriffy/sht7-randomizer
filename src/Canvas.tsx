import { FunctionComponent } from 'react'
import Sketch, { SketchProps } from 'react-p5'

import { ItemCircle } from './classes/ItemCircle'
import { PlayerCircle } from './classes/PlayerCircle'

export const Canvas: FunctionComponent = () => {
  let items: ItemCircle[] = []
  let players: PlayerCircle[] = []

  const setup: SketchProps['setup'] = (p5, canvasParentRef) => {
    p5.createCanvas(
      document.body.clientWidth,
      document.body.clientHeight
    ).parent(canvasParentRef)

    Array.from({ length: 10 }).map(() => {
      items.push(
        new ItemCircle(document.body.clientWidth, document.body.clientHeight, {
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

    players.forEach(player => {
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
      players.push(
        new PlayerCircle(
          forgedEvent.x,
          forgedEvent.y,
          `Player ${players.length}`,
          items
        )
      )
    }
  }

  return <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked} />
}
