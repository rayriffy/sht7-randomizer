import type P5 from 'p5'
import { ItemCircle } from './ItemCircle'
import { awardsAtom } from '../atoms/awardsAtom'

export class PlayerCircle {
  centerX: number
  centerY: number

  playerName: string
  hit: boolean = false

  size = 15

  constructor(
    posX: number,
    posY: number,
    playerName: string,
    items: ItemCircle[]
  ) {
    // random center position
    this.centerX = posX
    this.centerY = posY
    this.playerName = playerName
  }

  update() {
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

  render(p5: P5) {
    if (!this.hit) p5.stroke(255, 255, 255)
    // else
    //   p5.stroke(
    //     this.closestItem.colorR,
    //     this.closestItem.colorG,
    //     this.closestItem.colorB
    //   )

    p5.fill(255, 255, 255, 0)
    p5.strokeWeight(4)
    p5.ellipse(this.centerX, this.centerY, this.size)

    p5.fill(255, 255, 255)
    p5.noStroke()
    p5.ellipse(this.centerX, this.centerY, 15)
    p5.text(this.playerName, this.centerX, this.centerY + 20)

    p5.stroke(255, 255, 255)
    // p5.line(
    //   this.centerX,
    //   this.centerY,
    //   this.closestItem.centerX,
    //   this.closestItem.centerY
    // )
  }
}
