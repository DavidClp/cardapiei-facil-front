import React, { useState } from "react";
import { formatarParaBRL } from "../../../utils/formataParaBRL";
import Modal from "../../../components/basicosComponents/Modal";
import { Card, CardContent, CardFooter } from "../../../componentes/card";
import { ButtonComIcon } from "../../../components/basicosComponents/Buttons";
import { Minus, Plus } from "lucide-react";
import { CarrinhoProps } from "../../../stores/carrinho/carrinho-slice-store";
import { useStore } from "../../../stores/bound";

export interface Props {
  produto: CarrinhoProps;
}

export const CardProdutoCarrinho = ({ produto }: Props) => {
  const addCarrinho = useStore((state) => state.addCarrinho);
  const removeProduto = useStore((state) => state.removeProduto);
  const calcularValorTotal = useStore((state) => state.calcularValorTotal);
  const calcularQuantidadeTotal = useStore((state) => state.calcularQuantidadeTotal);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagemSelecionada, setimagemSelecionada] = useState(false);
  const openModal = (imagem) => {
    setimagemSelecionada(imagem);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  function handleAddProduto() {
    addCarrinho(produto);
    calcularQuantidadeTotal();
    calcularValorTotal()
  }

  function handleRemoverProduto() {
    removeProduto(produto.id);
    calcularQuantidadeTotal();
    calcularValorTotal()
  }

  return (
    <>
      <Card
        key={produto.id}
        className="flex  w-full bg-background px-2 md:px-3 py-2 "
      >
        <div onClick={() => openModal(produto?.imagem)}>
          {produto.imagem ? (
            <img
              src={produto.imagem}
              alt="foto do produto"
              className="w-28 h-24 md:w-20 md:h-20 rounded object-cover shadow-sm"
            />
          ) : null}
        </div>

        <CardContent className="flex flex-col p-2 w-full">
          <div className="flex justify-between w-full items-center">
            <h3 className="capitalize font-bold text-sm md:text-base">
              {produto.nome}
            </h3>

            <span className="flex items-center min-h-full whitespace-nowrap bg-background py-1 px-2 rounded shadow-sm text-xs">
              {formatarParaBRL(produto.valor)}
            </span>
          </div>

          <div className="flex mt-auto ml-auto pt-2">
            {/* @ts-ignore */}
            <ButtonComIcon onClick={handleRemoverProduto}>
              <Minus />
            </ButtonComIcon>
            <p className="text-lg text-center font-medium w-9 lg:w-12">
              {produto.quantidade}
            </p>
            {/* @ts-ignore */}
            <ButtonComIcon onClick={handleAddProduto}>
              <Plus />
            </ButtonComIcon>
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <div className="flex items-center justify-center max-w-[90vw] lg:max-w-[50vw]">
          <img
            src={imagemSelecionada}
            alt="foto do produto"
            className="w-full h-full rounded object-cover shadow-sm"
          />
        </div>
      </Modal>
    </>
  );
};
