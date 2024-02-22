import { StateCreator, create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/* 
type State = {
    estId: number,
    estUrl: number
}

type Actions = {
    setEstId: (newId: number) => void;
    definirUrl: (estUrl: number) => void;
} */

export interface UserStore {
  estId: number;
  estUrl: number;
  definirEstId: (newId: number) => void;
  definirUrl: (estUrl: number) => void;
}

export const createUserSlice: StateCreator<
  UserStore,
  [],
  [],
  UserStore
  > = (set) => ({
      estId: null,
      estUrl: null,

      definirEstId: (newId) => set({ estId: newId }),
      definirUrl: (estUrl) => set({ estUrl: estUrl }),
})

