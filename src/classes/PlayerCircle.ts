import type P5 from 'p5'
import { ItemCircle } from './ItemCircle'

export class PlayerCircle {
  centerX: number
  centerY: number

  playerName: string

  play: boolean = true
  hit: boolean = false

  size = 15

  closestItem: ItemCircle
  cloestDistance: number

  constructor(posX: number, posY: number, playerName: string, items: ItemCircle[]) {
    // random center position
    this.centerX = posX
    this.centerY = posY
    this.playerName = playerName

    // find closest item that has not been assigned to anyone yet
    let pickedClosestItem
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const distance = Math.sqrt(Math.pow((this.centerX - item.centerX), 2) + Math.pow((this.centerY - item.centerY), 2))
      if ((!pickedClosestItem || distance < pickedClosestItem.distance) && item.assigned === null) {
        pickedClosestItem = {
          item,
          distance
        }
      }
    }

    pickedClosestItem!.item.assignedToPlayer(this)
    this.closestItem = pickedClosestItem!.item
    this.cloestDistance = pickedClosestItem!.distance
  }

  update() {
    const speed = 2
    if (this.play) {
      if (this.size <= (this.cloestDistance * 2))
        this.size = this.size + speed
      else
        this.hit = true
    }
  }

  render(p5: P5) {
    if (!this.hit) p5.stroke(255, 255, 255)
    else p5.stroke(this.closestItem.colorR, this.closestItem.colorG, this.closestItem.colorB)

    p5.fill(255, 255, 255, 0)
    p5.strokeWeight(4)
    p5.ellipse(this.centerX, this.centerY, this.size)

    p5.fill(255, 255, 255)
    p5.noStroke()
    p5.ellipse(this.centerX, this.centerY, 15)
    p5.text(this.playerName, this.centerX, this.centerY + 20)

    p5.stroke(255, 255, 255)
    p5.line(this.centerX, this.centerY, this.closestItem.centerX, this.closestItem.centerY)
  }

  setPlay(play: boolean) {
    this.play = play
  }
}
