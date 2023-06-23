import type P5 from 'p5'

export class PlayerCircle {
  centerX: number
  centerY: number

  playerName: string

  play: boolean = true

  size = 15

  constructor(posX: number, posY: number, playerName: string) {
    // random center position
    this.centerX = posX
    this.centerY = posY
    this.playerName = playerName
  }

  update() {
    if (this.play) {
      this.size++
    }
  }

  render(p5: P5) {
    p5.stroke(255, 255, 255)
    p5.fill(255, 255, 255, 0)
    p5.strokeWeight(4)
    p5.ellipse(this.centerX, this.centerY, this.size)

    p5.fill(255, 255, 255)
    p5.noStroke()
    p5.ellipse(this.centerX, this.centerY, 15)
    p5.text(this.playerName, this.centerX, this.centerY + 20)
  }

  setPlay(play: boolean) {
    this.play = play
  }
}
