import { atom } from "nanostores";
import { ItemCircle } from "../classes/ItemCircle";

export const itemsAtom = atom<ItemCircle[]>([])
