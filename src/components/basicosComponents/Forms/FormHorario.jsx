import React from "react";
import { ButtonRemove } from "../Buttons";
import { ButtonAdd } from "../Buttons";

import { Input } from "../../../componentes/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../componentes/card";

import { Clock2 } from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "react-query";
import { urlApi } from "../../../constants/urlApi";
const est_id = localStorage.getItem("est_id");
const url = urlApi;

export const FormHorario = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    mutate(data);
  };

  //pegar horarios ja registrados para mostrar
  const { data, isLoading, refetch } = useQuery(["horarios", est_id], () => {
    return axios
      .get(`${url}api/horarios/${est_id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => response.data);
  });

  const { mutate } = useMutation(
    (data) => {
      return axios
        .post(`${url}api/horarios/`, data, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => response.data);
    },
    {
      onSuccess: (responseData) => {
        reset();
        refetch(); //verificar
      },
    }
  );

  const { mutate: deleteHorario } = useMutation(
    (HorarioId) =>
      axios.delete(`${url}api/horarios/${HorarioId}`, {
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

  return (
    <Card>
      <CardHeader >
        <CardTitle className="flex justify-center gap-2">
      <Clock2 />
          Horários de atendimento</CardTitle>
      </CardHeader>

      <CardContent>
      <form
        onSubmit={handleSubmit(onSubmit)}

      >
        <div className="flex flex-col items-center justify-center gap-3 lg:flex-row">
          <select name="dia" id="dia" {...register("dia")} className="rounded p-2 text-sm w-52">
            <option value=""></option>
            <option value="Todos os dias">Todos os dias</option>
            <option value="De segunda a sexta">De segunda a sexta</option>
            <option value="Aos fim de semana">Aos fim de semana</option>
            <option value="Domingo">Domingo</option>
            <option value="Segunda Feira">Segunda-feira</option>
            <option value="Terça Feira">Terça-feira</option>
            <option value="Terça Feira">Quarta-feira</option>
            <option value="Terça Feira">Quinta-feira</option>
            <option value="Terça Feira">Sexta-feira</option>
            <option value="Sabado">Sabado</option>
          </select>

          <div className="flex items-center justify-center gap-2">
            <Input
              type="time"
              name="hor_abre"
              id="hor_abre"
              {...register("hor_abre")}
              className="rounded p-1 bg-corTextSecundaria w-24"
            />
            <Input
              type="time"
              name="hor_fecha"
              id="hor_fecha"
              {...register("hor_fecha")}
              className="rounded p-1 bg-corTextSecundaria w-24"
            />
            <ButtonAdd />
          </div>
        </div>
      </form>
      </CardContent>
      
      {isLoading === false &&
        data.map((horario) => (
          <div className="flex flex-1 items-center flex-col justify-center py-2 px-6 gap-1 w-full" key={horario.id}>
            <div className="rounded  bg-corTextSecundaria">
              <p>{horario.dia}</p>
            </div>

            <div className="flex items-center justify-center rounded p-2 gap-3 w-full">
              <div className="flex items-center justify-center p-2 gap-3 bg-accent rounded w-full">
              <p>Das</p>
              <p className="font-medium">{horario.hor_abre}</p>
              <p>até</p>
              <p className="font-medium">{horario.hor_fecha}</p>

              </div>
            <ButtonRemove onClick={() => deleteHorario(horario.id)} />
            </div>

          </div>
        ))}
    </Card>
  );
};
