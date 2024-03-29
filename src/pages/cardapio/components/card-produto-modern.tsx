import React, { useState } from "react";
import { formatarParaBRL } from "../../../utils/formataParaBRL";
import Modal from "../../../components/basicosComponents/Modal";
import { Card, CardContent } from "../../../componentes/card";
import { ProdutoListResponse } from "../../../services/produto/schemas/ProdutoListResponse";
import { Link } from "react-router-dom";

export interface Props {
  produto: ProdutoListResponse;
  index: number;
}

export const CardProdutoModern = ({ produto, index }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagemSelecionada, setimagemSelecionada] = useState(false);
  const openModal = (imagem) => {
    setimagemSelecionada(imagem);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Card
        key={index}
        className="flex items-center w-full bg-background px-2 md:px-3 py-2"
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

        <Link to={`produto/${produto.id}`} className="w-full">
          <CardContent className="w-full px-2 md:px-4">
            <div className="flex justify-between w-full items-center">
              <h3 className="capitalize font-bold text-sm md:text-base">
                {produto.nome}
              </h3>

              <span className="flex items-center bg-background py-1 px-2 rounded shadow-sm text-xs">
                {formatarParaBRL(produto.valor)}
              </span>
            </div>

            <p className="text-sm md:text-base md:max-w-[90%]">
              {produto.descricao !== "null" && produto.descricao}
            </p>
          </CardContent>
        </Link>
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
