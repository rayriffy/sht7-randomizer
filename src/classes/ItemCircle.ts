import type P5 from "p5";
import { Item } from "../@types/Item";
import { colorFor } from "../colorGenerator";

export class ItemCircle {
  centerX: number;
  centerY: number;

  item: Item;

  size = 20;
  padding = 32;

  color = colorFor("item " + Math.random());

  constructor(maxWidth: number, maxHeight: number, item: Item) {
    // random center position
    this.centerX =
      (Math.floor(Math.random() * 1000000) % (maxWidth - this.padding * 2)) +
      this.padding;
    this.centerY =
      (Math.floor(Math.random() * 1000000) % (maxHeight - this.padding * 2)) +
      this.padding;
    this.item = item;
  }

  render(p5: P5) {
    p5.fill(...this.color);
    p5.noStroke();
    p5.ellipse(this.centerX, this.centerY, this.size);
  }
}
