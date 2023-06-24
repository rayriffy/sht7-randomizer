import md5 from "md5";
import { colord } from "./colord";

export function colorFor(text: string): [r: number, g: number, b: number] {
  const hash = md5(`${text}`);
  const hue = parseInt(hash.slice(0, 7), 16) % 360;

  const rgb = colord({ h: hue, c: 72, l: 80 }).toRgb();
  return [rgb.r, rgb.g, rgb.b];
}
