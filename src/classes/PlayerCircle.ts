import { canvasHeight, canvasWidth } from '../metrics'
import { playAtom } from '../atoms/playAtom'

import type P5 from 'p5'
import { ItemCircle } from './ItemCircle'

function pingpong(offset: number, max: number) {
  return max - Math.abs((offset % (max * 2)) - max)
}

export class PlayerCircle {
  centerX: number
  centerY: number

  playerName: string

  /** true if item is hit */
  collectedItem: ItemCircle | null = null

  /** size is diameter, not radius(!) */
  size = 15
  startTime: number
  starting = true

  constructor(private posX: number, private posY: number, playerName: string) {
    this.centerX = posX
    this.centerY = posY
    this.startTime = performance.now()
    this.playerName = playerName
  }

  update() {
    const time = performance.now() - this.startTime
    if (this.starting) {
      this.centerX = pingpong(this.posX - 16 + time, canvasWidth - 32) + 16
      this.centerY = pingpong(this.posY - 16 + time, canvasHeight - 32) + 16
    }

    if (!playAtom.get()) return
    if (this.collectedItem) return
    const speed = 2
    this.size = this.size + speed
    // if (this.size <= this.cloestDistance * 2) this.size = this.size + speed
    // else if (!this.hit) {
    //   this.hit = true
    //   awardsAtom.set([
    //     ...awardsAtom.get(),
    //     { player: this.playerName, item: this.closestItem.item.name },
    //   ])
    // }
  }

  isColliding(item: ItemCircle) {
    const distance = Math.sqrt(
      (this.centerX - item.centerX) ** 2 + (this.centerY - item.centerY) ** 2
    )
    if (distance <= this.size / 2) {
      return true
    }
    return false
  }

  render(p5: P5) {
    if (this.collectedItem) {
      p5.stroke(...this.collectedItem.color)
    } else {
      p5.stroke(255, 255, 255)
    }
    // else
    //   p5.stroke(
    //     this.closestItem.colorR,
    //     this.closestItem.colorG,
    //     this.closestItem.colorB
    //   )

    p5.fill(255, 255, 255, 0)
    p5.strokeWeight(4)
    p5.ellipse(
      this.centerX,
      this.centerY,
      this.collectedItem
        ? Math.hypot(
            this.centerX - this.collectedItem.centerX,
            this.centerY - this.collectedItem.centerY
          ) * 2
        : this.size
    )

    p5.fill(255, 255, 255)
    p5.noStroke()
    p5.ellipse(this.centerX, this.centerY, 15)
    p5.text(this.playerName, this.centerX, this.centerY + 20)

    // p5.stroke(255, 255, 255)
    // p5.line(
    //   this.centerX,
    //   this.centerY,
    //   this.closestItem.centerX,
    //   this.closestItem.centerY
    // )
  }
}
