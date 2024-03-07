import { ProdutoDetalheResponse } from "../../services/produto/schemas/ProdutoDetalheResponse";
import { StateCreator } from "zustand";

export type CarrinhoProps = ProdutoDetalheResponse & { quantidade: number };

export interface CarrinhoStore {
  carrinho: CarrinhoProps[];
  valorTotal: number;
  quantidadeTotal: number;

  addCarrinho: (produto: ProdutoDetalheResponse) => void;
  removeProduto: (proId: number) => void;
  calcularValorTotal: () => void;
  calcularQuantidadeTotal: () => void;
  zerarCarrinho: () => void;
}

export const createCarrinhoSlice: StateCreator<
  CarrinhoStore,
  [],
  [],
  CarrinhoStore
> = (set) => ({
  carrinho: [],
  valorTotal: 0,
  quantidadeTotal: 0,

  addCarrinho: (produto) =>
    set((state) => {
      const existeProduto = state.carrinho.find(({ id }) => produto.id === id);

      if (existeProduto) {
        return {
          carrinho: state.carrinho.map((produto) =>
            produto.id === existeProduto.id
              ? { ...produto, quantidade: produto.quantidade + 1 }
              : produto
          ),
        };
      }
      return {
        carrinho: [...state.carrinho, { ...produto, quantidade: 1 }],
      };
    }),

  removeProduto: (proId) =>
    set((state) => {
      const carrinhoAtualizado = state.carrinho.map((produto) =>
        produto.id === proId
          ? {
              ...produto,
              quantidade: produto.quantidade > 1 ? produto.quantidade - 1 : 0,
            }
          : produto
      );

      const carrinho = carrinhoAtualizado.filter(
        (produto) => produto.quantidade > 0
      );

      return { carrinho };
    }),

  calcularValorTotal: () =>
    set((state) => ({
      valorTotal: state.carrinho.reduce(
        (accumulator, produto) =>
          accumulator + produto.valor * produto.quantidade,
        0
      ),
    })),

  calcularQuantidadeTotal: () =>
    set((state) => ({
      quantidadeTotal: state.carrinho.reduce(
        (accumulator, produto) => accumulator + produto.quantidade,
        0
      ),
    })),

  zerarCarrinho: () =>
    set(() => ({
      carrinho: [],
      valorTotal: 0,
      quantidadeTotal: 0,
    })),
});
