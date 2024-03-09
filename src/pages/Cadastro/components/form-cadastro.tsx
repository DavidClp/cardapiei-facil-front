import React from "react";
import validator from "validator";
import { urlApi } from "../../../constants/urlApi";
import { Input } from "../../../componentes/input";
import { Label } from "../../../componentes/label";
import { DivInput } from "../../../components/basicosComponents/DivInput";
import {
  ButtonCadastrar,
  ButtonFakeLoading,
} from "../../../components/basicosComponents/Buttons";

export const FormCadastro = ({
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
        <Label>Seu nome</Label>
        <Input
          type="text"
          className={`${errors?.nome && "outline-rose-500"}`}
          {...register("nome", { required: true })}
        />
        {errors?.nome?.type === "required" && (
          <p className="text-rose-500">Nome é requerido</p>
        )}
      </DivInput>

      <DivInput>
        <Label>E-mail</Label>
        <Input
          type="text"
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
          <p className="text-rose-500">E-mail Inválido</p>
        )}
      </DivInput>

      <DivInput>
        <Label>WhatsApp com DDD</Label>
        <Input
          type="text"
          className={`rounded p-2 w-full ${errors?.nome && "outline-rose-500"}`}
          {...register("telefone", { required: true, validate: (value) => validator.isNumeric(value) })}
        />
        {errors?.telefone?.type === "required" && (
          <p className="text-rose-500">Telefone é requerido</p>
        )}
           {errors?.telefone?.type === "validate" && (
          <p className="text-rose-500">Telefone Inválido</p>
        )}
      </DivInput>

      <DivInput className="input">
        <Label htmlFor="senha">Senha</Label>
        <Input
          type="password"
          name="senha"
          id="senha"
          placeholder="********"
          className={`rounded py-1 px-2 w-full ${
            errors?.senha && "outline-rose-500"
          }`}
          {...register("senha", { required: true, minLength: 8 })}
        />
        {errors?.senha?.type === "required" && (
          <p className="text-rose-500">senha é requerido</p>
        )}
        {errors?.senha?.type === "minLength" && (
          <p className="text-rose-500">Senha precisa no minimo 8 caracteres</p>
        )}
      </DivInput>

      {!isLoading ? <ButtonCadastrar /> : <ButtonFakeLoading />}
    </form>
  );
};
