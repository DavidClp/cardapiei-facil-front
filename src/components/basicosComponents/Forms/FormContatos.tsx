import React from "react";
import { ButtonRemove } from "../Buttons";
import { ButtonAdd } from "../Buttons";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "react-query";
import { urlApi } from "../../../constants/urlApi";
import { DivInput } from "../DivInput";
import { Label } from "../Label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../componentes/card";
import { Input } from "../../../componentes/input";
import { Separator } from "../../../componentes/separator";
import { PhoneIncoming } from "lucide-react";
const estId = localStorage.getItem("estId");
const url = urlApi;
import { useStore } from "../../../stores/bound";


export const FormContato = () => {
  const estId = useStore((state) => state.estId);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    mutate(data);
  };

  //pegar contatos ja registrados para mostrar
  const { data, isLoading, refetch } = useQuery(["contatos", estId], () => {
    return axios
      .get(`${url}api/contatos/${estId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => response.data);
  });

  const { mutate: deleteContato } = useMutation(
    (contatoId) =>
      axios.delete(`${url}api/contatos/${contatoId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error("Erro ao excluir o contato", error);
      },
    }
  );

  const { mutate } = useMutation(
    (data) => {
      return axios
        .post(`${url}api/contatos`, data, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => response.data);
    },
    {
      onSuccess: (responseData) => {
        refetch(); //verificar
        reset();
      },
    }
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-center gap-2">
          <PhoneIncoming className="w-5"/>
          Meios de contato do estabelecimento
        </CardTitle>
      </CardHeader>
      <Separator />

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5 flex flex-col items-center justify-center gap-4"
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-2 w-full">
            <select
              name="tipoContato"
              id="tipoContato"
              {...register("tipo")}
              className="rounded p-2 border border-input w-40 text-sm"
            >
              <option value="">Escolha</option>
              <option value="telefone">Telefone</option>
              <option value="whatsapp">Whatsapp</option>
              <option value="email">E-mail</option>
            </select>
            <div className="flex justify-center items-center w-[90%] lg:w-[75%] gap-2 lg:px-4">
              <Input
                type="text"
                name="contato"
                id="contato"
                {...register("contato")}
              />
              <ButtonAdd />
            </div>
          </div>
        </form>
      </CardContent>

      <CardFooter>
        {isLoading === false &&
          data.map((contato) => (
            <div
              className="flex items-center flex-col justify-center px-6 py-1 w-full"
              key={contato.id}
            >
              <div className="rounded p-2 lg:w-[30%] text-center font-medium capitalize">
                <p>{contato.tipo}</p>
              </div>

              <div className="flex gap-2 w-full items-center">
                <div className="rounded p-2 bg-accent w-full text-sm">
                  <p>{contato.contato}</p>
                </div>
                <ButtonRemove onClick={() => deleteContato(contato.id)} />
              </div>
            </div>
          ))}
      </CardFooter>
    </Card>
  );
};
