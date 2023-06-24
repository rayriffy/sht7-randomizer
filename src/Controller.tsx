import { useStore } from '@nanostores/react'
import { playersAtom } from './atoms/playersAtom'
import { playAtom } from './atoms/playAtom'
import { awardsAtom } from './atoms/awardsAtom'
import { useMemo } from 'react'
// import autoAnimate from '@formkit/auto-animate'

export const Controller = () => {
  const play = useStore(playAtom)
  const players = useStore(playersAtom)
  const awards = useStore(awardsAtom)

  const reversedAwards = useMemo(() => Array.from(awards).reverse(), [awards])

  return (
    <section className="w-full h-screen flex flex-col justify-between">
      <div className="h-1/2 bg-neutral-700 space-y-2 text-xl text-white px-8 py-6 overflow-y-scroll">
        {reversedAwards.map(award => (
          <div
            key={`award-${award.id}-${award.player}-${award.item}`}
            className="flex justify-between"
          >
            <span>👤 {award.player}</span>
            <span>➡️</span>
            <span>{award.item}</span>
          </div>
        ))}
      </div>
      <div className="p-8">
        <button
          className={`text-2xl text-white disabled:bg-pink-300 py-4 w-full rounded-xl font-bold ${
            play ? 'bg-red-500' : 'bg-pink-500'
          }`}
          disabled={players.length === 0}
          onClick={() => playAtom.set(!play)}
        >
          {play ? 'STOP' : 'START'}
        </button>
      </div>
    </section>
  )
}
