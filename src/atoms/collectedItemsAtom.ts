import { persistentAtom } from '@nanostores/persistent'

export const collectedItemsAtom = persistentAtom<string[]>(
  'collectedItems',
  [],
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
)
