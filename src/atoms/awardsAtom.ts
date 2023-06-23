import { atom } from 'nanostores'

interface Award {
  player: string
  item: string
}

export const awardsAtom = atom<Award[]>([])
