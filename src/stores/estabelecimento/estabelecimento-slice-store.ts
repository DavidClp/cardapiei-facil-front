import { CategoriaListResponse } from "../../services/produto/schemas/CategoriaListResponse";
import { EstabelecimentoFullDetalheResponse } from "../../services/estabelecimento/schemas/EstabelecimentoFullDetalheResponse";
import { StateCreator } from "zustand";
import { Omit } from 'utility-types'; // Importe a função Omit


type EstabelecimentoType = Omit<EstabelecimentoFullDetalheResponse, keyof CategoriaListResponse>;

export interface EstabelecimentoStore {
  estalecimentoCardapio: EstabelecimentoType;
  categoriasProdutos: CategoriaListResponse

  definirEstabelecimentoCardapio: (
    estCardapio: EstabelecimentoType
  ) => void;
  
  definirCategoriaProdutos: (
    categoriasProdutos: CategoriaListResponse
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
