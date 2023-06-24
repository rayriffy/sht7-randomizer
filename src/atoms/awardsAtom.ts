import { atom } from 'nanostores'

interface Award {
  id: number
  player: string
  item: string
}

export const awardsAtom = atom<Award[]>([])
