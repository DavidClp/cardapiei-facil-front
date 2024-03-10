import { CategoriaDetalheResponse } from "../../services/produto/schemas/CategoriaDetalheResponse";
import { StateCreator } from "zustand";

export type quantidadeProdutosDasCategoriasProps = {
  catId: number;
  quantidade: number;
};

export interface CardapioAdminStore {
  qtdProdutosDasCategorias: quantidadeProdutosDasCategoriasProps[];

  calcularQtdProdutosDasCategorias: (
    categoria: CategoriaDetalheResponse
  ) => void;
  getQtdProdutosDasCategoriasByCatId: (
    catId: number
  ) => number;
}

export const createCardapioAdminSlice: StateCreator<
  CardapioAdminStore,
  [],
  [],
  CardapioAdminStore
> = (set, get) => ({
  qtdProdutosDasCategorias: [],

  calcularQtdProdutosDasCategorias: (categoria) =>
    set((state) => {
      const quantidadeProduto = categoria?.Produtos.length || 0;

      const index = state.qtdProdutosDasCategorias.findIndex(
        (item) => item.catId === categoria.id
      );
      if (index !== -1) {
        const newQtdProdutosDasCategorias = [...state.qtdProdutosDasCategorias];
        newQtdProdutosDasCategorias[index] = {
          catId: categoria.id,
          quantidade: quantidadeProduto,
        };
        return {
          qtdProdutosDasCategorias: newQtdProdutosDasCategorias,
        };
      }

      // Caso contrário, adicione uma nova entrada
      return {
        qtdProdutosDasCategorias: [
          ...state.qtdProdutosDasCategorias,
          { catId: categoria.id, quantidade: quantidadeProduto },
        ],
      };
    }),

    getQtdProdutosDasCategoriasByCatId: (catId: number) => {
    const state = get();
    const categoria = state.qtdProdutosDasCategorias.find(item => item.catId === catId);
    
    if (categoria) {
        return categoria.quantidade;
    } else {
        return 0; 
    }
  }
});
