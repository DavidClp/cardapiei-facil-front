import { CategoriaResponse } from "../../services/produto/schemas/CategoriaResponse";
import { EstabelecimentoFullDetalheResponse } from "../../services/estabelecimento/schemas/EstabelecimentoFullDetalheResponse";
import { StateCreator } from "zustand";
import { Omit } from 'utility-types'; // Importe a função Omit


type EstabelecimentoType = Omit<EstabelecimentoFullDetalheResponse, keyof CategoriaResponse>;

export interface EstabelecimentoStore {
  estalecimentoCardapio: EstabelecimentoType;
  categoriasProdutos: CategoriaResponse

  definirEstabelecimentoCardapio: (
    estCardapio: EstabelecimentoType
  ) => void;
  
  definirCategoriaProdutos: (
    categoriasProdutos: CategoriaResponse
  ) => void;

}

export const createEstabelecimentoSlice: StateCreator<
  EstabelecimentoStore,
  [],
  [],
  EstabelecimentoStore
> = (set) => ({
  estalecimentoCardapio: null,
    categoriasProdutos: null,

  definirEstabelecimentoCardapio: (estCardapio) =>
    set({
      estalecimentoCardapio: estCardapio,
    }),

  definirCategoriaProdutos: (estCardapio) =>
    set({
        categoriasProdutos: estCardapio,
    }),
});
