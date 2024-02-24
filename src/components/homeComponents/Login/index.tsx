import React, { useState } from "react";
import { FormLogin } from "../../basicosComponents/Forms";
import { Navigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { urlApi } from "../../../constants/urlApi";
import HeaderMobile from "../../../pages/home/components/HeaderMobile";
import Header from "../../../pages/home/components/Header";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../componentes/card";
import { User } from "lucide-react";
import { useStore } from "../../../stores/bound";
const url = urlApi;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const methods = useForm();

  const [logou, setLogou] = useState(0); //GAMBIARRA, ARRUMAR
  const [errorLogin, setErrorLogin] = useState(""); //GAMBIARRA, ARRUMAR

  //zustand
  const definirEstId = useStore((state) => state.definirEstId)
  const definirUrl = useStore((state) => state.definirUrl)


  const onSubmit = (data) => {
    console.log(data);
    mutate(data);
  };

  const { mutate, isError } = useMutation(
    // @ts-ignore
    (data) => {
      return axios
        .post(`${url}api/usuarios/login`, data)
        .then((response) => response.data);
    },
    {
      onSuccess: (responseData) => {
        const dados = responseData;
        console.log("DADOS", dados)
        //zustand
        definirEstId(dados.est_id);
        definirUrl(dados.est_url);

        //Remover = localStorage
        localStorage.setItem("token", dados.token);
        localStorage.setItem("est_id", dados.est_id);
        localStorage.setItem("est_url", dados.est_url);

        sessionStorage.setItem("token", dados.token);
        sessionStorage.setItem("est_id", dados.est_id);
        sessionStorage.setItem("est_url", dados.est_url);
        localStorage.setItem("usuario", JSON.stringify(dados.usuario));
      
       setLogou(1);
      },
      onError: (error: AxiosError) => {
        if (error.response.status === 401) {
          setErrorLogin(
            "Usuário ou senha incorreto! Por favor tente novamente"
          );
        }
      },
    }
  );

  return (
    <div className="bg-background h-full flex flex-col">
      <HeaderMobile />
      <Header />
      <section>
        {logou === 1 && sessionStorage.getItem("est_id") ? (
          <Navigate to="/admin/cardapio" />
        ) : null}

        <div className="flex items-center justify-center translate-y-[60%]">
          <Card>
            <CardHeader >
              <CardTitle className="flex justify-center gap-2">
                <User className="font-extrabold text-xl"/> 
                Login
              </CardTitle>
            </CardHeader>
            <CardContent>
                <FormLogin
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                errors={errors}
                isError={isError}
                errorLogin={errorLogin}
              />
            </CardContent>
            <CardFooter> </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Login;
