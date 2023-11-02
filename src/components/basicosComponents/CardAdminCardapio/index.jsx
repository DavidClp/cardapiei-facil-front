import React, { useState } from "react";
import "./forms.scss";
import {
  ButtonRemove,
  ButtonEfeite,
  ButtonAtivo,
  ButtonInativo,
} from "../Buttons";
import Modal from "../Modal";
import { FormProduto } from "../../basicosComponents/FormsAdminCardapio";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { formatarParaBRL } from "../../../utils/formataParaBRL";
import { urlApi } from "../../../constants/urlApi";

/* const est_id = localStorage.getItem("est_id"); */
const url = urlApi

const CardProduto = ({ categoria, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState(null); // Novo estado para armazenar o produto

  const openModal = (produto) => {
    setSelectedProduto(produto);
    setIsModalOpen(true);
    if (produto) {
      reset({
        nome: produto.nome,
        valor: produto.valor,
        descricao: produto.descricao,
      });
    } else {
      reset({
        nome: null,
        valor: null,
        descricao: null,
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    reset,
   /*  getValues, */
    formState: { errors },
  } = useForm();

  const onSubmit = (dataForm) => {
    const formData = new FormData();
    formData.append("nome", dataForm.nome);
    formData.append("valor", dataForm.valor);
    formData.append("descricao", dataForm.descricao);
    formData.append("imagem", dataForm.imagem[0]);
    /*     formData.append('ativo', 1); */
    if (dataForm.produtoId) {
      formData.append("produtoId", dataForm.produtoId); // Certifique-se de que o campo seja nomeado corretamente
      putMutate(formData);
    } else {
      mutate(formData);
    }
  };
  const { mutate } = useMutation(
    (formData) => {
      return axios
        .post(`${url}api/produtos/${categoria.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => response.data);
    },
    {
      onSuccess: (responseData) => {
        setIsModalOpen(false);
        refetch();
      },
    }
  );

  const { mutate: putMutate } = useMutation(
    (formData) => {
      return axios
        .put(`${url}api/produtos/${formData.get("produtoId")}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => response.data);
    },
    {
      onError: (error) => {
        console.error("Erro editar produto", error);
      },
      onSuccess: (responseData) => {
        setIsModalOpen(false);
        refetch();
      },
    }
  );

  const { mutate: deleteProduto } = useMutation(
    (produtoId) =>
      axios.delete(`${url}api/produtos/${produtoId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error("Erro ao excluir o produto", error);
      },
    }
  );

  const handleSituacao = (produto) => {
    let ativo = null;
    produto.ativo === 1 ? (ativo = 0) : (ativo = 1);
    putSituacao({
      id: produto.id,
      ativo: ativo,
    });
  };

  const { mutate: putSituacao } = useMutation(
    (formData) => {
      return axios
        .put(`${url}api/produtos/situacao/${formData.id}`, formData, {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => response.data);
    },
    {
      onError: (error) => {
        console.error("Erro ativar/inativar produtos", error);
      },
      onSuccess: (responseData) => {
        refetch();
      },
    }
  );

  return (
    <div className="formContainer">
      <div className="titulo">
        <h3>{categoria.nome}</h3>
      </div>

      {categoria?.Produtos?.map((produto) => (
        <div className="cardProduto">
          <div className="cardContent" onClick={() => openModal(produto)}>
            {produto.imagem && <img src={produto.imagem} alt="" />}
            <p>{produto.nome}</p>
            <p>{formatarParaBRL(parseFloat(produto.valor))}</p>
          </div>
          {produto.ativo === 1 ? (
            <ButtonAtivo onClick={() => handleSituacao(produto)} />
          ) : (
            <ButtonInativo onClick={() => handleSituacao(produto)} />
          )}
          <ButtonRemove onClick={() => deleteProduto(produto.id)} />
        </div>
      ))}

      <div className="containerButtonCardapio">
        <ButtonEfeite
          texto={"Adicionar Item"}
          onClick={() => openModal(null)}
        />
      </div>

      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <FormProduto
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          selectedProduto={selectedProduto}
        />
      </Modal>
    </div>
  );
};

export { CardProduto };
