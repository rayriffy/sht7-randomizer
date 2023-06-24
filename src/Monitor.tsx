import { useStore } from '@nanostores/react'

import { awardsAtom } from "./atoms/awardsAtom"
import { FunctionComponent } from 'react'

export const Monitor: FunctionComponent = () => {
  const awards = useStore(awardsAtom)

  return (
    <div className="p-4 absolute bg-white/70 rounded-lg right-4 top-4">
      {awards.map(award => (
        <div key={`award-player-${award.player}`}>
        <p>{award.player} - {award.item}</p>
        </div>
      ))}
    </div>
  )
}