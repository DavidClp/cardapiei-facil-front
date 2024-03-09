import React from "react";
import { ButtonForm } from "../Buttons";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "react-query";
import { urlApi } from "../../../constants/urlApi";
import { DivInput } from "../DivInput";
import { Label } from "../Label";
import LoaderSpin from "../loaders/loader-spin";
import { Input } from "../../../componentes/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../componentes/card";
import Toast from "../toast";
const est_id = localStorage.getItem("est_id");
const url = urlApi;

export const FormLocalizacao = () => {
  const { register, handleSubmit } = useForm();
  
  const onSubmit = (dataLocalizacao) => {
    mutate(dataLocalizacao);
  };

  //pegar dados ja registrados para mostrar
  // @ts-ignore
  const { data, isLoading } = useQuery(["localizacao", est_id], () => {
    return axios
      .get(`${url}api/localizacao/${est_id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => response.data);
  });

  const { mutate, isSuccess } = useMutation(
    // @ts-ignore
    (dataLocalizacao) => {
      return axios
        .put(`${url}api/localizacao/${est_id}`, dataLocalizacao, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => response.data);
    },
  );

  if (isLoading) {
    return <LoaderSpin />;
  }

  return (
    <Card>
       {isSuccess ? <Toast type="success">Endereço Atualizado com Sucesso!</Toast> : null}

      <CardHeader>
        <CardTitle className="flex justify-center gap-2">
        <FaLocationDot />
          Localização do estabelecimento
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-4"
        >
          <DivInput>
            <Label htmlFor="cep">CEP</Label>
            <Input
              type="text"
              name="cep"
              id="cep"
              {...register("cep")}
              defaultValue={data?.cep}
            />
          </DivInput>

          <DivInput>
            <Label htmlFor="endereco">Endereço</Label>
            <Input
              type="text"
              name="endereco"
              id="endereco"
              defaultValue={data?.endereco}
              {...register("endereco")}
            />
          </DivInput>

          <div className="grid grid-cols-3 gap-3 w-full">
            <DivInput className="col-span-2">
              <Label htmlFor="bairro">Bairro</Label>
              <Input
                type="text"
                name="bairro"
                id="bairro"
                {...register("bairro")}
                defaultValue={data?.bairro}
              />
            </DivInput>

            <DivInput>
              <Label htmlFor="numero">Número</Label>
              <Input
                type="number"
                name="numero"
                id="numero"
                {...register("numero")}
                defaultValue={data?.numero}
              />
            </DivInput>
          </div>

          <DivInput>
            <Label htmlFor="cidade">Cidade</Label>
            <Input
              type="text"
              name="cidade"
              id="cidade"
              {...register("cidade")}
              defaultValue={data?.cidade}
              />
          </DivInput>
          <ButtonForm />
      
        </form>
      </CardContent>

    </Card>
  );
};
