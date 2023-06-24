import { Item } from '../@types/Item'
import { colorFor } from '../functions/colorGenerator'
import md5 from 'md5'

import type P5 from 'p5'

export class ItemCircle {
  centerX: number
  centerY: number

  item: Item

  size = 20
  pickedUp = false

  color: [number, number, number]

  maxWidth = 1280
  maxHeight = 800

  constructor(public itemId: string, item: Item) {
    const hash = md5(itemId)
    const padding = 32
    this.color = colorFor(itemId)
    this.centerX = Math.round(
      (parseInt(hash.slice(0, 6), 16) / 0xffffff) *
        (this.maxWidth - 2 * padding) +
        padding
    )
    this.centerY = Math.round(
      (parseInt(hash.slice(6, 12), 16) / 0xffffff) *
        (this.maxHeight - 2 * padding) +
        padding
    )
    this.item = item
  }

  render(p5: P5) {
    // if (this.pickedUp) return
    p5.fill(...this.color)
    p5.noStroke()
    p5.ellipse(this.centerX, this.centerY, this.size)
  }
}
