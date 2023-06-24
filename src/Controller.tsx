import { useStore } from "@nanostores/react"
import { playersAtom } from "./atoms/playersAtom"
import { playAtom } from "./atoms/playAtom"

export const Controller = () => {
  const play = useStore(playAtom)
  const players = useStore(playersAtom)


  return (
    <section className="w-full h-full flex flex-col justify-between">
      <div></div>
      <div className="p-8">
        <button className="text-2xl text-white bg-pink-500 py-4 w-full rounded-xl font-bold" onClick={() => playAtom.set(!play)}>{play ? 'STOP' : 'START'}</button>
      </div>
    </section>
  )
}