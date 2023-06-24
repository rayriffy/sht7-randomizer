import { FunctionComponent } from 'react'
import Sketch, { SketchProps } from 'react-p5'

import { PlayerCircle } from './classes/PlayerCircle'

import { playAtom } from './atoms/playAtom'
import { playersAtom } from './atoms/playersAtom'
import { itemsAtom } from './atoms/itemsAtom'
import { awardsAtom } from './atoms/awardsAtom'
import { canvasHeight, canvasWidth } from './metrics'
import { updateInventory } from './functions/updateInventory'

export const Canvas: FunctionComponent = () => {
  const setup: SketchProps['setup'] = (p5, canvasParentRef) => {
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef)
  }

  const draw: SketchProps['draw'] = p5 => {
    p5.background(0)

    let stillActive = false
    playersAtom.get().forEach(player => {
      player.update()

      itemsAtom.get().forEach(item => {
        if (
          playAtom.get() &&
          player.isColliding(item) &&
          !item.pickedUp &&
          !player.collectedItem
        ) {
          player.collectedItem = item
          item.pickedUp = true
          awardsAtom.set([
            ...awardsAtom.get(),
            {
              id: awardsAtom.get().length,
              player: player.playerName,
              item: item.item.name,
            },
          ])
        }
      })

      if (!player.collectedItem) {
        stillActive = true
      }
    })

    if (!stillActive && playAtom.get()) {
      // at this point, no more players still waiting to collect things
      playAtom.set(false)
      updateInventory()
    }

    itemsAtom.get().forEach(item => {
      item.render(p5)
    })

    playersAtom.get().forEach(player => {
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
    if (
      forgedEvent.x >= 16 &&
      forgedEvent.x < canvasWidth - 16 &&
      forgedEvent.y >= 16 &&
      forgedEvent.y < canvasHeight - 16
    ) {
      playersAtom.set([
        ...playersAtom.get(),
        new PlayerCircle(
          forgedEvent.x,
          forgedEvent.y,
          `Player ${playersAtom.get().length + 1}`
        ),
      ])
    }
  }
  const mouseReleased: SketchProps['mouseReleased'] = (_, event) => {
    console.log('released')
    playersAtom.get().forEach(player => {
      player.starting = false
    })
  }
  const keyPressed: SketchProps['keyPressed'] = (_, event) => {
    if (
      (event as KeyboardEvent).key === ' ' &&
      !playersAtom.get().some(player => player.starting)
    ) {
      playersAtom.set([
        ...playersAtom.get(),
        new PlayerCircle(
          Math.random() * canvasWidth,
          Math.random() * canvasHeight,
          `Player ${playersAtom.get().length + 1}`
        ),
      ])
    }
  }

  return (
    <Sketch
      setup={setup}
      draw={draw}
      // mousePressed={mouseClicked}
      // mouseReleased={mouseReleased}
      keyPressed={keyPressed}
      keyReleased={mouseReleased}
    />
  )
}
