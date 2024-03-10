import React from "react";
import { CardProduto } from "./categoria-card";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "react-query";
import { urlApi } from "../../../../constants/urlApi";
import Toast from "../../../../components/basicosComponents/toast";
import Loader from "../../../../components/basicosComponents/loaders/loader";
import { useStore } from "../../../../stores/bound";
import { useCategoriasProdutoList } from "../../../../stores/cardapio-admin/use-categorias-produto-lista";
import { FormCategoria } from "../../../../components/basicosComponents/FormsAdminCardapio/";

const url = urlApi;

const Main = () => {
  const estId = useStore((state) => state.estId);

  const { register, handleSubmit, reset, formState:{errors} } = useForm();
 
  const onSubmit = (data) => {
    mutate(data);
  };

  //pegar categorias ja registrados para mostrar
  const { data, isLoading, isError: isErroQuery, refetch } = useCategoriasProdutoList({ estId });

  const { mutate: deleteCategoria, isError: deleteCategoriaError, isSuccess: deleteCategoriaSucess } = useMutation(
    (categoriaId) =>
      axios.delete(`${url}api/categorias/${categoriaId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error("Erro ao excluir a categoria", error);
      },
    }
  );

  const { mutate, isSuccess, isError } = useMutation(
    (data) => {
      return axios.post(`${url}api/categorias`, data, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
    },
    {
      onSuccess: (responseData) => {
        refetch();
        reset();
      },
    }
  );

  if (isLoading) return <Loader/>

  return (
    <div className="flex flex-col px-2 lg:px-20 gap-6 mt-20 lg:mt-5 lg:-gap-0 lg:flex-row py-6 h-full bg-background">
      
      {isSuccess ? <Toast type="success">Categoria Adicionada com Sucesso!</Toast> : null}
      {deleteCategoriaSucess  ? <Toast type="success">Categoria Excluída com Sucesso!</Toast> : null}
      {isError || deleteCategoriaError ? <Toast type="error" duration={4000}></Toast> : null}

        <FormCategoria
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          deleteCategoria={deleteCategoria}
          isLoading={isLoading}
          data={data}
          refetch={refetch}
          errors={errors}
        />

      <div className="flex flex-col gap-5 items-center justify-center w-full lg:w-[100vw]">
        {data?.map((categoria) => (
          <CardProduto categoria={categoria} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default Main;
