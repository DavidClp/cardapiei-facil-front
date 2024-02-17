import React, { useState } from "react";
import "./forms.scss";
import {
  ButtonLogin,
  ButtonCadastrar,
  ButtonForm,
  ButtonFakeLoading,
} from "../Buttons";

import { ImHome } from "react-icons/im";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "react-query";
import validator from "validator";
import { urlApi } from "../../../constants/urlApi";
import { DivInput } from "../DivInput";
import { Label } from "../Label";
import LoaderSpin from "../loaders/loader-spin";
import Toast from "../toast";
import { Card, CardContent, CardHeader, CardTitle } from "src/componentes/card";
import { Input } from "src/componentes/input";
import { TextField } from "../../../componentes/text-field";
import { Form } from "../../../componentes/form";
const est_id = localStorage.getItem("est_id");
const url = urlApi;

const FormEstabelecimento = () => {
  /*  const { estIdStore } = useEstIdStore(); */
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [logoSelecionada, setLogoSelecionada] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Pegar dados já registrados para mostrar
  const { data, isLoading } = useQuery(["estabelecimento", est_id], () => {
    return axios
      .get(`${url}api/estabelecimentos/geral/${est_id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        return response.data;
      });
  });

  const [imageSetFromData, setImageSetFromData] = useState(false);
  if (data && data.logo && !imageSetFromData) {
    setImagemSelecionada(data.logo);
    setImageSetFromData(true);
  }

  const onSubmit = (dataForm) => {
    const formData = new FormData();
    formData.append("nome", dataForm.nome);
    formData.append("descricao", dataForm.descricao);
    formData.append("logo", logoSelecionada);
    // @ts-ignore
    mutate(formData);
  };

  const { mutate, isSuccess, isError } = useMutation((formData) => {
    return axios
      .put(`${url}api/estabelecimentos/geral/${est_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => response.data);
  }, {});

  //pega a imagem selecionada
  const handleImagemChange = (e) => {
    const arquivoSelecionado = e.target.files[0];
    setLogoSelecionada(e.target.files[0]);
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

  if (isLoading) {
    return <LoaderSpin />;
  }

  return (
    <Card 
    /* w-full lg:w-[60%]  */
    className="
    mt-20 lg:mt-0">
      <CardHeader>
        <CardTitle  className="flex justify-center gap-2">
          <ImHome />
          Informações Básicas
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-4"
        >
          <DivInput>
            <Label htmlFor="nome">Nome do estabelecimento</Label>
            <Input
              type="text"
              name="nome"
              id="nome"
              placeholder="Lanchonete"
              className={` ${
                errors?.nome && "outline-rose-500"
              }`}
              defaultValue={data.nome}
              {...register("nome", { required: true })}
            />
          </DivInput>
          <DivInput>
            <Label htmlFor="descricao">Descrição do estabelecimento</Label>
            <textarea
              name="descricao"
              id="descricao"
              cols="50"
              rows="3"
              placeholder="Mostre o que seu estabelecimento tem de melhor aos seus clientes"
              className={`rounded-md p-2 w-full outline-primary border border-input "
              ${
                errors?.nome && "outline-rose-500"
              }`}
              defaultValue={data?.descricao}
              {...register("descricao")}
            ></textarea>
            {errors?.nome?.type === "required" && (
              <p className="text-rose-500">Nome é requerido</p>
            )}
          </DivInput>

          <div>
            {imagemSelecionada ? (
              <div>
                <img
                  src={imagemSelecionada}
                  alt="Imagem Selecionada"
                  className="w-40 h-36 mb-1 bg-background object-cover"
                />
              </div>
            ) : (
              <div>
                <label
                  className="w-40 h-36 bg-background p-3 rounded inline-block cursor-pointer mb-1"
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
                <label
                  className="bg-background p-1 rounded inline-block cursor-pointer"
                  htmlFor="customFile"
                >
                  Adicionar
                </label>
                <input
                  type="file"
                  className="absolute opacity-0 cursor-pointer"
                  id="customFile"
                  name="file"
                  {...register("logo")}
                  onChange={handleImagemChange}
                />
              </>
            )}
          </div>

          <ButtonForm />
          </form>
        </CardContent>


        {isSuccess && (
          <Toast type="success" duration="4000">
            Informações Básicas alteradas com Sucesso!
          </Toast>
        )}
    </Card>
  );
};

const FormCadastro = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  isLoading,
}) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-4 w-80 sm:w-96"
    >
      <DivInput>
        <Label htmlFor="nome">Seu nome</Label>
        <Input
          type="text"
          name="nome"
          id="nome"
          className={`rounded p-2 w-full ${errors?.nome && "outline-rose-500"}`}
          {...register("nome", { required: true })}
        />
        {errors?.nome?.type === "required" && (
          <p className="text-rose-500">Nome é requerido</p>
        )}
      </DivInput>

      <DivInput>
        <Label htmlFor="email">E-mail</Label>
        <Input
          type="text"
          name="email"
          id="email"
          className={`rounded-md p-2 w-full  ${
            errors?.email && "outline-rose-500"
          }`}
          {...register("email", {
            required: true,
            validate: (value) => validator.isEmail(value),
          })}
        />
        {errors?.email?.type === "required" && (
          <p className="text-rose-500">E-mail é requerido</p>
        )}
        {errors?.email?.type === "validate" && (
          <p className="ext-rose-500">E-mail Inválido</p>
        )}
      </DivInput>

      {!isLoading ? <ButtonCadastrar /> : <ButtonFakeLoading />}
    </form>
  );
};

const FormLogin = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  isError,
  errorLogin,
}) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-4 w-80 sm:w-96"
    >
      {isError && !errorLogin ? (
        <p>
          Aconteceu algum erro inesperado ao executar essa ação, se o erro
          persistir entre em contato com o suporte!"
        </p>
      ) : (
        ""
      )}
      {errorLogin && (
        <p className="text-rose-800 font-medium bg-rose-200 p-2 rounded shadow shadow-rose-200">
          {errorLogin}
        </p>
      )}
      <DivInput>
        <Label htmlFor="email">E-mail</Label>
        <Input
          type="text"
          name="email"
          id="email"
          {...register("email", {
            required: true,
            validate: (value) => validator.isEmail(value),
          })}
        />
        {errors?.email?.type === "required" && (
          <p className="text-rose-500">E-mail é requirido</p>
        )}
        {errors?.email?.type === "validate" && (
          <p className="text-rose-500">E-mail Invalido</p>
        )}
      </DivInput>

      <DivInput className="input">
        <Label htmlFor="senha">Senha</Label>
        <Input
          type="password"
          name="senha"
          id="senha"
          placeholder="********"
          {...register("senha", { required: true })}
        />

        {errors?.senha?.type === "required" && (
          <p className="text-rose-500">senha é requirido</p>
        )}
      </DivInput>
      <ButtonLogin />
    </form>
  );
};

export { FormEstabelecimento, FormCadastro, FormLogin };
