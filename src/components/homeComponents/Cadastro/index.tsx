import React, { useState } from "react";
import { FormCadastro } from "../../basicosComponents/Forms";
import { Navigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { urlApi } from "../../../constants/urlApi";
import HeaderMobile from "../../../pages/home/components/HeaderMobile";
import Header from "../../../pages/home/components/Header";
import useEstStore from "../../../stores/estIdStore";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../componentes/card";
import { User } from "lucide-react";
const url = urlApi;

const Cadastro = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [cadastrou, setCadastrou] = useState(0); //GAMBIARRA, ARRUMAR

  const onSubmit = (data) => {
    mutate(data);
  };

  const definirUrl = useEstStore((state) => state.definirUrl);

  const { mutate, isLoading } = useMutation(
    (data) => {
      return axios
        .post(`${url}api/usuarios/`, data)
        .then((response) => response.data);
    },
    {
      onSuccess: (responseData) => {
        const dados = responseData;
        localStorage.setItem("token", dados.token);
        localStorage.setItem("est_id", dados.est_id);
        localStorage.setItem("est_url", dados.est_url);

        sessionStorage.setItem("token", dados.token);
        sessionStorage.setItem("est_id", dados.est_id);
        sessionStorage.setItem("est_url", dados.est_url);
        
        definirUrl(dados.est_url);
        localStorage.setItem("est_url", JSON.stringify(dados.usuario));
        setCadastrou(1);
      },
      onError: (e: AxiosError) => {
        window.alert(e.response.data)
      }
    }
  );

  return (
    <div className="bg-background h-full flex flex-col">
      {cadastrou === 1 && <Navigate to="/setup" />}
      <HeaderMobile />
      <Header />

      <div className="flex items-center justify-center translate-y-[60%] px-">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-center gap-2">
              <User className="font-extrabold text-xl" />
              Cadastro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormCadastro
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              register={register}
              errors={errors}
              isLoading={isLoading}
            />
          </CardContent>
          <CardFooter> </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Cadastro;
