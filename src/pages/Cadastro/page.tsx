import React from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { urlApi } from "../../constants/urlApi";
import HeaderMobile from "../home/components/HeaderMobile";
import Header from "../home/components/Header";
//import useEstStore from "../../../stores/estIdStore";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../componentes/card";
import { User } from "lucide-react";
import { FormCadastro } from "./components/form-cadastro";
const url = urlApi;

const Cadastro = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    mutate(data);
  };

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
        
       // definirUrl(dados.est_url);
        localStorage.setItem("est_url", JSON.stringify(dados.usuario));
        navigate("/setup");
      },
      onError: (e: AxiosError) => {
        window.alert(e.response.data)
      }
    }
  );

  return (
    <div className="bg-background min-h-full">
      <HeaderMobile />
      <Header />

      <div className="flex items-center justify-center h-full pt-48">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-center gap-2">
              <User className="font-extrabold text-xl" />
              Cadastro
            </CardTitle>
          </CardHeader>
          <CardContent className=''>
            <FormCadastro
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              register={register}
              errors={errors}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cadastro;
