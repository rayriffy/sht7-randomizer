import { playersAtom } from '../atoms/playersAtom'
import { collectedItemsAtom } from '../atoms/collectedItemsAtom'

export const updateInventory = async () => {
  const players = playersAtom.get()

  players.forEach(player => {
    collectedItemsAtom.set([
      ...collectedItemsAtom.get(),
      player.collectedItem?.itemId ?? '',
    ])
  })
}
