import { useStore } from "../../../stores/bound";
import React from "react";
import HeaderMobile from "../../../components/cardapioComponents/HeaderMobile";
import { CardProdutoCarrinho } from "../components/card-produto-carrinho";
import { Button } from "../../../componentes/button";
import { Separator } from "../../../componentes/separator";
import { Card } from "../../../componentes/card";
import { formatarParaBRL } from "../../../utils/formataParaBRL";
import { cfgtDD } from "../../../services/DD/cfgtDD";
import { useForm } from "react-hook-form";
import { Input } from "../../../componentes/input";
import { ArrowRightCircle } from "lucide-react";
import { criaMensagemPedido } from "./functions/criaMensagemPedido";
import { useNavigate } from "react-router-dom";

export interface FormProps {
  nomeCliente: string;
  enderecoEntrega: string;
}

export const CarrinhoPage = () => {
  const carrinho = useStore((state) => state.carrinho);
  const valorTotal = useStore((state) => state.valorTotal);
  const getConfiguracaoByCfgtId = useStore(
    (state) => state.getConfiguracaoByCfgtId
  );
  const zerarCarrinho = useStore(
    (state) => state.zerarCarrinho
  );
  const estUrl = useStore(
    (state) => state.estUrl
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const NUMERO_WHATSAPP = getConfiguracaoByCfgtId(
    cfgtDD.NUMERO_WHATSAPP_PEDIDO
  ).texto;
  const obrigaNome = getConfiguracaoByCfgtId(
    cfgtDD.CARRINHO_OBRIGA_NOME
  ).numero;
  const obrigaEndereco = getConfiguracaoByCfgtId(
    cfgtDD.CARRINHO_OBRIGA_ENDERECO_ENTREGA
  ).numero;

  function handleEnviarPedido(data: FormProps) {
    const nomeCliente = data.nomeCliente
    const enderecoEntrega = data.enderecoEntrega
    const mensagem = criaMensagemPedido({carrinho, valorTotal, nomeCliente, enderecoEntrega})

    const linkWhatsApp = `https://api.whatsapp.com/send?phone=55${NUMERO_WHATSAPP}&text=${encodeURIComponent(
      mensagem
    )}`;

   window.open(linkWhatsApp, '_blank');
   navigate("..",  { relative: "path" })
   zerarCarrinho();
  }

  return (
    <>
      <HeaderMobile />
      <section className="flex flex-col items-center px-2 md:px-4 py-5 bg-background w-full min-h-full">
        <div className="flex flex-col gap-3 mt-16 mb-3 w-full">
          {carrinho.map((produto) => (
            <CardProdutoCarrinho produto={produto} />
          ))}
        </div>
        <Separator />

        <Card className="my-6 w-full p-4">
          <div className="flex flex-row items-center gap-2">
            <p className="text-lg font-medium">Total: </p>
            <p className="text-primary text-xl font-bold">
              {formatarParaBRL(valorTotal)}
            </p>
          </div>
        </Card>

        <Separator />

        <form
          onSubmit={handleSubmit(handleEnviarPedido)}
          className="flex flex-col gap-10 py-4 w-full mt-auto"
        >
          <div className="space-y-4">
            {errors?.nomeCliente?.type === "required" && (
              <p className="text-rose-500">Nome é requirido</p>
            )}
            <Input
              {...register("nomeCliente", {required: !!obrigaNome})}
              className=""
              placeholder="Nome"
            />

            {errors?.enderecoEntrega?.type === "required" && (
              <p className="text-rose-500">Endereço de entrega é requirido</p>
            )}
            <textarea
              cols="50"
              rows="3"
              className={`rounded-md p-2 w-full outline-primary border border-input placeholder:text-muted-foreground ${
                errors?.enderecoEntrega ? "focus:outline-red-500" : ""
              }`}
              placeholder="Endereço de entrega"
              {...register("enderecoEntrega", { required: !!obrigaEndereco })}
            />
          </div>
          <Button type="submit" className="flex gap-2 w-full mt-auto">
            Enviar pedido
            <ArrowRightCircle />
          </Button>
        </form>
      </section>
    </>
  );
};
