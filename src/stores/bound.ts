import { createEstabelecimentoSlice, EstabelecimentoStore } from './estabelecimento/estabelecimento-slice-story';
import { create } from "zustand";
import { createUserSlice, UserStore } from "./user-store";
import { createJSONStorage, persist } from "zustand/middleware";
import { CarrinhoStore, createCarrinhoSlice } from './carrinho/carrinho-slice-store';

type Store = UserStore & EstabelecimentoStore & CarrinhoStore

export const useStore = create<Store>()(
    persist(
        (...setGet) => ({
            ...createUserSlice(...setGet),
            ...createEstabelecimentoSlice(...setGet),
            ...createCarrinhoSlice(...setGet),
        }),
        {
            name: "cardapiei-facil-storage",
            storage: createJSONStorage(() => localStorage), 
        }
    )
)