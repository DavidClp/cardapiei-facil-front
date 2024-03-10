import React, { useState } from "react";
import "./forms.scss";
import {
  ButtonForm,
  ButtonRemove,
  ButtonComIcon,
  ButtonAtivo,
  ButtonInativo,
  ButtonFakeLoading,
} from "../Buttons";
import { useMutation } from "react-query";

import { ButtonAdd } from "../Buttons";
import { IoIosSave } from "react-icons/io";
import axios from "axios";
import { TbCategory } from "react-icons/tb";
import { MdCancel } from "react-icons/md";
import { urlApi } from "../../../constants/urlApi";
import Modal from "../Modal";
import { AlertDialog } from "../alert-dialog";
import Toast from "../toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../componentes/card";
import { Input } from "../../../componentes/input";
import { Label } from "../../../componentes/label";
import { useStore } from "../../../stores/bound";
const url = urlApi;

export const FormProduto = ({
  handleSubmit,
  onSubmit,
  register,
  isLoadingPut,
  errors,
  selectedProduto,
  setImagem2Selecionada,
  catId
}) => {
  const getQtdProdutosDasCategoriasByCatId = useStore((state) => state.getQtdProdutosDasCategoriasByCatId);
  const ordemPosicaoProduto = getQtdProdutosDasCategoriasByCatId(catId) + 1;

  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  const [imageSetFromData, setImageSetFromData] = useState(false);
  if (selectedProduto && selectedProduto.imagem && !imageSetFromData) {
    setImagemSelecionada(selectedProduto.imagem);
    setImageSetFromData(true);
  }
  //pega a imagem selecionada
  const handleImagemChange = (e) => {
    const arquivoSelecionado = e.target.files[0];
    setImagem2Selecionada(e.target.files[0]);
    if (arquivoSelecionado) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagemSelecionada(e.target.result);
      };

      reader.readAsDataURL(arquivoSelecionado);
    }
  };
  //retira a imagem selecionada
  const handleRemoverImagem = () => {
    setImagemSelecionada(null);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center py-2 lg:p-4 gap-4 w-full"
    >
      {selectedProduto?.id && (
        <Input
          type="hidden"
          name="produtoId"
          id="produtoId"
          value={selectedProduto.id}
          {...register("produtoId")}
        />
      )}
      <div className="flex flex-col justify-center gap-2 w-full">
        <Label htmlFor="nome" className="font-semibold">
          Nome do produto
        </Label>
        <Input
          type="text"
          name="nome"
          id="nome"
          className={`rounded-md p-2 w-full focus:outline-none ${
            errors?.nome ? "focus:outline-red" : ""
          }`}
          placeholder="Exemplo: Pizza Portuguesa"
          defaultValue={selectedProduto?.nome || ""}
          {...register("nome", { required: true })}
        />
        {errors?.nome?.type === "required" && (
          <p className="text-red">Nome é requirido</p>
        )}
      </div>

      <div className="flex justify-center gap-2 w-full">
        <div className="w-full">
          <Label htmlFor="valor" className="font-semibold">
            Valor
          </Label>
          <Input
            type="text"
            placeholder="0.00"
            defaultValue={selectedProduto?.valor || ""}
            {...register("valor")}
          />
        </div>
        <div>
          <Label htmlFor="valor" className="font-semibold">
            Ordem (posição)
          </Label>
          <Input
            type="number"
            defaultValue={selectedProduto?.ordem || ordemPosicaoProduto}
            {...register("ordem")}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center gap-2 w-full">
        <Label htmlFor="descricao" className="font-semibold">
          Descrição do produto
        </Label>
        <textarea
          cols="50"
          rows="3"
          className="rounded-md p-2 w-full outline-primary border border-input"
          /*  defaultValue={selectedProduto?.descricao && selectedProduto?.descricao !== "null" ? selectedProduto?.descricao : "" } */
          defaultValue={
            selectedProduto?.descricao ? selectedProduto?.descricao : ""
          }
          {...register("descricao")}
        ></textarea>
      </div>

      <div>
        {imagemSelecionada ? (
          <div>
            <img
              src={imagemSelecionada}
              alt="Imagem Selecionada"
              className="w-40 h-36 mb-1 bg-accent object-cover"
            />
          </div>
        ) : (
          <div>
            <label
              className="w-40 h-36 bg-accent p-3 rounded inline-block cursor-pointer mb-1"
              htmlFor="customFile"
            >
              Clique Aqui para Adicionar uma imagem
            </label>
          </div>
        )}

        {imagemSelecionada ? (
          <label
            className="bg-accent p-1 rounded inline-block cursor-pointer z-50"
            onClick={handleRemoverImagem}
          >
            Remover
          </label>
        ) : (
          <>
            <Label
              className="bg-accent p-1 rounded inline-block cursor-pointer"
              htmlFor="customFile"
            >
              Adicionar
            </Label>
            <input
              type="file"
              className="absolute opacity-0 cursor-pointer"
              id="customFile"
              name="file"
              {...register("imagem")}
              onChange={handleImagemChange}
            />
          </>
        )}
      </div>
       {
 /*        isLoadingPut ?  <ButtonFakeLoading/> : <ButtonForm /> */
 <ButtonForm />
       }   
      
    </form>
  );
};

export const FormCategoria = ({
  handleSubmit,
  onSubmit,
  register,
  deleteCategoria,
  isLoading,
  data,
  refetch,
  errors,
}) => {
  const [isOpenEditCategoria, setIsOpenEditCategoria] = useState(false);
  const [editCategoriaId, setEditCategoriaId] = useState(null);
  const [editCategoriaNome, setEditCategoriaNome] = useState("");

  const openEditCategoria = (categoria) => {
    setIsOpenEditCategoria(true);
    setEditCategoriaId(categoria.id);
    setEditCategoriaNome(categoria.nome);
  };

  const cancelEditCategoria = () => {
    setIsOpenEditCategoria(false);
    setEditCategoriaId(null);
    setEditCategoriaNome("");
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    // Chame putMutate para fazer a edição
    putMutate({
      id: editCategoriaId,
      nome: editCategoriaNome,
    });

    // Reset os campos
    cancelEditCategoria();
  };

  const {
    mutate: putMutate,
    isError: isErrorPut,
    isSuccess: isSucessPut,
  } = useMutation(
    (formData) => {
      return axios.put(`${url}api/categorias/${formData.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
    },
    {
      onSuccess: (responseData) => {
        /* setIsModalOpen(false); */
        refetch();
      },
    }
  );

  const handleSituacao = (categoria) => {
    let ativo = null;
    categoria.ativo === 1 ? (ativo = 0) : (ativo = 1);
    putSituacao({
      id: categoria.id,
      ativo: ativo,
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    mutate: putSituacao,
    isError: isErrorSit,
    isSuccess: isSucessSit,
  } = useMutation(
    (formData) => {
      return axios
        .put(`${url}api/categorias/situacao/${formData.id}`, formData, {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => response.data);
    },
    {
      onError: (error) => {
        console.error("Erro ativar/inativar categorias", error);
      },
      onSuccess: (responseData) => {
        refetch();
      },
    }
  );

  return (
    <Card className="w-full h-full">
      {isSucessPut || isSucessSit ? (
        <Toast type="success">Categoria Atualizada com Sucesso!</Toast>
      ) : null}
      {isErrorPut || isErrorSit ? (
        <Toast type="error" duration={4000}></Toast>
      ) : null}

      <CardHeader>
        <div className="flex items-center justify-center gap-4 p-4">
          <CardTitle className="flex justify-center gap-2">
            <TbCategory />
            Categorias do cardápio
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5 flex flex-col ga-4"
        >
          {errors.nome?.type === "required" && (
            <p className="text-destructive">Digite um nome válido!</p>
          )}
          <div className="flex items-center justify-center w-full gap-2">
            <Input
              type="text"
              name="categoria"
              id="categoria"
              className="rounded p-2 w-full focus:outline-primary"
              {...register("nome", { required: true, minLength: 1 })}
            />
            <ButtonAdd />
          </div>
        </form>

        {isLoading === false &&
          data?.map((categoria) => (
            <div className="flex flex-col" key={categoria.id}>
              {isOpenEditCategoria && editCategoriaId === categoria.id ? (
                <form
                  onSubmit={handleEditSubmit}
                  className=" flex flex-col ga-4 w-full"
                >
                  <div className="p-3 flex items-center gap-1 w-full border-solid border-accent border-t-[1px] justify-between">
                    <Input
                      type="text"
                      value={editCategoriaNome}
                      onChange={(e) => setEditCategoriaNome(e.target.value)}
                    />
                    <div className="flex gap-1">
                      <ButtonComIcon>
                        <IoIosSave className="icon" />
                      </ButtonComIcon>
                      <ButtonComIcon onClick={cancelEditCategoria}>
                        <MdCancel className="icon" />
                      </ButtonComIcon>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="flex items-center p-3 gap-3 border-solid border- border-t-[1px] w-full justify-between">
                  <div
                    onClick={() => openEditCategoria(categoria)}
                    className="w-full"
                  >
                    <p>{categoria.nome}</p>
                  </div>
                  <div className="flex gap-1">
                    {categoria.ativo === 1 ? (
                      <ButtonAtivo onClick={() => handleSituacao(categoria)} />
                    ) : (
                      <ButtonInativo
                        onClick={() => handleSituacao(categoria)}
                      />
                    )}
                    <ButtonRemove onClick={openModal} />
                  </div>
                  <Modal isOpen={isModalOpen} closeModal={closeModal}>
                    <AlertDialog
                      closeModal={closeModal}
                      onClick={() => deleteCategoria(categoria.id)}
                    />
                  </Modal>
                </div>
              )}
            </div>
          ))}
      </CardContent>
    </Card>
  );
};

/* export { FormProduto, FormCategoria };
 */
