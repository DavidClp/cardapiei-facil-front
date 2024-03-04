import React, {useEffect} from "react";

import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { urlApi } from "../../../../constants/urlApi";
import { useStore } from "../../../../stores/bound";
import Loader from "../../../../components/basicosComponents/loaders/loader";
import Toast from "../../../../components/basicosComponents/toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../componentes/card";
import { Input } from "../../../../componentes/input";
import { Label } from "../../../../componentes/label";
import { Button } from "../../../../componentes/button";
import { useMutation } from "@tanstack/react-query";
import { cfgtDD } from "../../../..//services/DD/cfgtDD";
import { useConfiguracaoEstabelecimento } from "../../../../stores/configuracao/use-configuracao-estabelecimento";

const url = urlApi;

interface IFormInput {
  whatsappPedido: number;
}

const Main = () => {
  const estId = useStore((state) => state.estId);

  //pegar categorias ja registrados para mostrar
  const { data: dataConfiguracao } = useConfiguracaoEstabelecimento({
    estId: estId
  });

  const {
    register,
    handleSubmit,
    setValue, // Adicionando setValue ao destructuring
    formState: { errors },
  } = useForm();

  // Definindo valores padrão usando setValue
  useEffect(() => {
    dataConfiguracao?.forEach(cfg => {
      setValue(cfg.cfgt_id.toString(), cfg.numero); // Define o valor para o campo cfgt_id
    });
  }, [dataConfiguracao, setValue]);

  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post(`${url}api/configuracao`, data, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
    },
    onSuccess: () => {
    },
    onError: () => {
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    for (const chave in data) {
        const enviar = {
          cfgtId: chave,
          numero: null,
          texto: data[chave],
        };
        //@ts-ignore
        mutation.mutate(enviar);
    }
  };

  if (mutation.isPending) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center px-2 lg:px-20 gap-6 mt-5 lg:-gap-0 lg:flex-row py-6 h-full bg-background">
      {mutation.isSuccess ? (
        <Toast type="success">Categoria Adicionada com Sucesso!</Toast>
      ) : null}

      <Card className="w-full md:w-[40%] mt-14 lg:mt-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Configuração do Cardápio</CardTitle>
          </CardHeader>

          <CardContent>
            {errors.nome?.type === "minLength" && (
              <p className="text-destructive">Digite um valor válido!</p>
            )}

            <div className="flex flex-col justify-center gap-2 w-full">
              <Label htmlFor="valor" className="font-semibold">
                Numero de WhatsApp para pedido
              </Label>
              <Input
                type="number"
                {...register(`${cfgtDD.NUMERO_WHATSAPP_PEDIDO}`, { minLength: 10 })}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Salvar</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Main;
