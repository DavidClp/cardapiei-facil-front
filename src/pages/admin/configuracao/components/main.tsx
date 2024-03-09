import React, { useEffect } from "react";

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
import { FormConfiguracao } from "../../../../services/configuracao/schemas/FormConfiguracao";
const url = urlApi;

const Main = () => {
  const estId = useStore((state) => state.estId);

  const { data: dataConfiguracao } = useConfiguracaoEstabelecimento({
    estId: estId,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dataConfiguracao?.forEach((cfg) => {
      setValue(cfg.cfgt_id.toString(), cfg?.numero || cfg?.texto);
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
  });

  const onSubmit: SubmitHandler<FormConfiguracao> = (data) => {
    for (const cfgtIndex in data) {
      const cfgValue = data[cfgtIndex];
      const cfg = dataConfiguracao.find(
        (cfg) => cfg.cfgt_id == parseInt(cfgtIndex)
      );
      if (cfgValue == cfg?.texto || cfgValue == cfg?.numero) {
        continue;
      }
      const alterar = !!cfg?.texto || !!cfg?.numero;

      const enviar = {
        cfgtId: cfgtIndex,
        numero: parseInt(cfgValue),
        texto: cfgValue,
        alterar: alterar,
      };
      //@ts-ignore
      mutation.mutate(enviar);
    }
  };

  if (mutation.isPending) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center px-2 lg:px-20 gap-6 mt-5 lg:-gap-0 lg:flex-row py-6 h-full bg-background">
      {mutation.isSuccess ? (
        <Toast type="success">Configurações Atualizadas com Sucesso!</Toast>
      ) : null}

      <Card className="w-full md:w-[40%] mt-14 lg:mt-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Configuração do Cardápio</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {errors.nome?.type === "minLength" && (
              <p className="text-destructive">Digite um valor válido!</p>
            )}

            <div className="flex flex-col justify-center gap-2 w-full">
              <Label>Numero de WhatsApp para pedido</Label>
              <Input
                type="number"
                {...register(`${cfgtDD.NUMERO_WHATSAPP_PEDIDO}`, {
                  minLength: 10,
                })}
              />
            </div>

            <div className="flex flex-col justify-center gap-2 w-full">
              <Label>Obrigatório cliente preencher o nome para o pedido</Label>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Input
                    type="radio"
                    value={1}
                    className="w-6"
                    {...register(`${cfgtDD.CARRINHO_OBRIGA_NOME}`)}
                  />
                  <Label>Sim</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="radio"
                    value={0}
                    className="w-6"
                    {...register(`${cfgtDD.CARRINHO_OBRIGA_NOME}`)}
                  />
                  <Label>Não</Label>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-2 w-full">
              <Label>Obrigatório cliente preencher o endereço para o pedido</Label>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Input
                    type="radio"
                    value={1}
                    className="w-6"
                    {...register(`${cfgtDD.CARRINHO_OBRIGA_ENDERECO_ENTREGA}`)}
                  />
                  <Label>Sim</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="radio"
                    value={0}
                    className="w-6"
                    {...register(`${cfgtDD.CARRINHO_OBRIGA_ENDERECO_ENTREGA}`)}
                  />
                  <Label>Não</Label>
                </div>
              </div>
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
