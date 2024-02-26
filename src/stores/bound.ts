import { createEstabelecimentoSlice, EstabelecimentoStore } from './estabelecimento/estabelecimento-slice-store';
import { create } from "zustand";
import { createUserSlice, UserStore } from "./user-store";
import { createJSONStorage, persist } from "zustand/middleware";
import { CarrinhoStore, createCarrinhoSlice } from './carrinho/carrinho-slice-store';
import { ConfiguracaoStore, createConfiguracaoSlice } from './configuracao/configuracao-slice-store';

type Store = UserStore & EstabelecimentoStore & CarrinhoStore & ConfiguracaoStore

export const useStore = create<Store>()(
    persist(
        (...setGet) => ({
            ...createUserSlice(...setGet),
            ...createEstabelecimentoSlice(...setGet),
            ...createCarrinhoSlice(...setGet),
            ...createConfiguracaoSlice(...setGet)
        }),
        {
            name: "cardapiei-facil-storage",
            storage: createJSONStorage(() => localStorage), 
        }
    )
)