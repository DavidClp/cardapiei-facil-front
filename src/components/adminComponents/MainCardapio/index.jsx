import React from "react";
import "./main.scss";
import { FormCategoria } from "../../basicosComponents/FormsAdminCardapio";
import { CardProduto } from "../../basicosComponents/CardAdminCardapio";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "react-query";
import { urlApi } from "../../../constants/urlApi";
import Toast from "../../basicosComponents/toast";
import Loader from "../../basicosComponents/loaders/loader";
const est_id = sessionStorage.getItem("est_id");
const url = urlApi;

const Main = () => {
  const { register, handleSubmit, reset, formState:{errors} } = useForm();
  const onSubmit = (data) => {
    mutate(data);
  };

  //pegar categorias ja registrados para mostrar
  const { data, isLoading, refetch } = useQuery(["categorias", est_id], () => {
    return axios
      .get(`${url}api/categorias/${sessionStorage.getItem("est_id")}`, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  });

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
    <div className="flex flex-col px-2 lg:px-20 gap-6 mt-5 lg:-gap-0 lg:flex-row py-6 h-full bg-background">
      
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
