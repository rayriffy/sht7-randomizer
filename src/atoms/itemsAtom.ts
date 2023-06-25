import { atom } from 'nanostores'
import { ItemCircle } from '../classes/ItemCircle'

export const itemsAtom = atom<ItemCircle[]>([])

const fixture = [
  [1, 1],
  [2, 1],
  [3, 1],
  [4, 1],
  [5, 1],
  [6, 1],
  [7, 1],
  [8, 3],
  [9, 1],
  [10, 1],
  [11, 1],
  [12, 3],
  [13, 1],
  [14, 1],
  [15, 1],
  [16, 1],
  [17, 1],
  [18, 1],
  [19, 2],
  [20, 1],
  [21, 1],
  [22, 1],
  [23, 1],
  [24, 2],
  [25, 1],
  [26, 1],
  [27, 1],
  [28, 2],
  [29, 1],
  [30, 1],
  [31, 1],
  [32, 1],
  [33, 2],
  [34, 1],
  [35, 3],
  [36, 2],
  [37, 1],
  [38, 2],
  [39, 1],
  [40, 1],
  [41, 1],
  [42, 1],
  [43, 10],
  [44, 1],
  [45, 1],
  [46, 4],
  [47, 1],
]

for (const [prizeId, quantity] of fixture) {
  for (const index of Array(quantity).keys()) {
    const id = `prize${prizeId}.${index}`
    itemsAtom.get().push(new ItemCircle(id, { id, name: id }))
  }
}
