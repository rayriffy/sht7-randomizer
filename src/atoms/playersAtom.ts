import { atom } from "nanostores";
import { PlayerCircle } from "../classes/PlayerCircle";

export const playersAtom = atom<PlayerCircle[]>([])
