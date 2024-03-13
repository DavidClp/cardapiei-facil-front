import React, { useState } from "react";
import {
  ButtonRemove,
  ButtonEfeite,
  ButtonAtivo,
  ButtonInativo,
  ButtonEdit,
  ButtonComplemento,
} from "../../../../components/basicosComponents/Buttons";
import Modal from "../../../../components/basicosComponents/Modal";
import { FormProduto } from "../../../../components/basicosComponents/FormsAdminCardapio";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { formatarParaBRL } from "../../../../utils/formataParaBRL";
import { urlApi } from "../../../../constants/urlApi";
import Toast from "../../../../components/basicosComponents/toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../componentes/card";
import { useStore } from "../../../../stores/bound";

const url = urlApi;

const CardProduto = ({ categoria, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState(null); // Novo estado para armazenar o produto

  const calcularQtdProdutosDasCategorias = useStore(
    (state) => state.calcularQtdProdutosDasCategorias
  );

  const openModal = (produto) => {
    calcularQtdProdutosDasCategorias(categoria);
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

  const [imagem2Selecionada, setImagem2Selecionada] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (dataForm) => {
    const formData = new FormData();
    formData.append("nome", dataForm.nome);
    formData.append("catId", categoria.id);
    formData.append("valor", dataForm.valor);
    formData.append("descricao", dataForm.descricao);
    formData.append("ordem", dataForm.ordem);
    formData.append("imagem", imagem2Selecionada);

    if (dataForm.produtoId) {
      formData.append("produtoId", dataForm.produtoId); // Certifique-se de que o campo seja nomeado corretamente
      putMutate(formData);
    } else {
      mutate(formData);
    }
  };

  const {
    mutate,
    isSuccess: isSucessAddProduto,
    isError: isErrorAddProduto,
  } = useMutation(
    (formData) => {
      return axios.post(`${url}api/produtos/${categoria.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      });
    },
    {
      onSuccess: (responseData) => {
        setIsModalOpen(false);
        refetch();
      },
    }
  );

  const {
    mutate: putMutate,
    isError: isErrorPut,
    isSuccess: isSucessPut,
    isLoading: isLoadingPut,
  } = useMutation(
    (formData) => {
      return axios.put(
        `${url}api/produtos/${formData.get("produtoId")}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        }
      );
    },
    {
      onSuccess: (responseData) => {
        setIsModalOpen(false);
        refetch();
      },
    }
  );

  const {
    mutate: deleteProduto,
    isError: deleteProdutoError,
    isSuccess: deleteProdutoSucess,
  } = useMutation(
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

  const {
    mutate: putSituacao,
    isError: isErrorSit,
    isSuccess: isSucessSit,
  } = useMutation(
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
    <Card className="w-full">
      {isSucessAddProduto && (
        <Toast type="success">Produto Adicionado com Sucesso!</Toast>
      )}
      {(isSucessPut || isSucessSit) && (
        <Toast type="success">Produto Atualizado com Sucesso!</Toast>
      )}

      {deleteProdutoSucess && (
        <Toast type="success">Produto Excluído com Sucesso!</Toast>
      )}

      {(isErrorAddProduto ||
        deleteProdutoError ||
        isErrorPut ||
        isErrorSit) && <Toast type="error" duration={4000}></Toast>}

      <CardHeader className="flex items-center p-3 border-b-solid border-b-[1px] border-b-cinzaClaro">
        <CardTitle className="font-semibold capitalize">
          {categoria.nome}
        </CardTitle>
      </CardHeader>

      {categoria?.Produtos?.map((produto) => (
        <CardContent className="flex justify-between items-center py-2 px-1 lg:px-4 gap-2 lg:gap-4">
          <div className="w-full flex items-center gap-1 lg-gap-3  ">
            {produto.imagem && (
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="w-11 h-11 lg:w-16 lg:h-16 object-cover rounded mr-1"
              />
            )}
            <div>
              <p className="font-medium text-sm lg:text-base">{produto.nome}</p>
              <p className="text-sm lg:text-base min-w-[53.5px]">
                {formatarParaBRL(produto.valor)}
              </p>
            </div>
          </div>

          <div className="flex gap-1">
              <ButtonEdit onClick={() => openModal(produto)} />
         {/*      <ButtonComplemento onClick={() => openModal(produto)} /> */}
              {produto.ativo === 1 ? (
                <ButtonAtivo onClick={() => handleSituacao(produto)} />
              ) : (
                <ButtonInativo onClick={() => handleSituacao(produto)} />
              )}
              <ButtonRemove onClick={() => deleteProduto(produto.id)} />
          </div>
        </CardContent>
      ))}
      <CardFooter>
        <div className="flex items-center justify-center py-4">
          <ButtonEfeite
            texto={"Adicionar Item"}
            onClick={() => openModal(null)}
          />
        </div>
      </CardFooter>

      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <FormProduto
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isLoadingPut={isLoadingPut}
          register={register}
          errors={errors}
          selectedProduto={selectedProduto}
          setImagem2Selecionada={setImagem2Selecionada}
          catId={categoria.id}
        />
      </Modal>
    </Card>
  );
};

export { CardProduto };
