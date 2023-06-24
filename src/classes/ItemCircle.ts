import type P5 from 'p5'
import { Item } from '../@types/Item'

export class ItemCircle {
  centerX: number
  centerY: number

  item: Item

  size = 20

  colorR =  Math.floor(Math.random() * 1000000) % 256
  colorG =  Math.floor(Math.random() * 1000000) % 256
  colorB =  Math.floor(Math.random() * 1000000) % 256

  constructor(maxWidth: number, maxHeight: number, item: Item) {
    // random center position
    this.centerX = Math.floor(Math.random() * 1000000) % maxWidth
    this.centerY = Math.floor(Math.random() * 1000000) % maxHeight
    this.item = item
  }

  render(p5: P5) {
    p5.fill(this.colorR, this.colorG, this.colorB)
    p5.noStroke()
    p5.ellipse(this.centerX, this.centerY, this.size)
  }
}
