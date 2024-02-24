import { createEstabelecimentoSlice, EstabelecimentoStore } from './estabelecimento/estabelecimento-slice-story';
import { create } from "zustand";
import { createUserSlice, UserStore } from "./user-store";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = UserStore & EstabelecimentoStore

export const useStore = create<Store>()(
    persist(
        (...setGet) => ({
            ...createUserSlice(...setGet),
            ...createEstabelecimentoSlice(...setGet)
        }),
        {
            name: "cardapiei-facil-storage",
            storage: createJSONStorage(() => localStorage), 
        }
    )
)