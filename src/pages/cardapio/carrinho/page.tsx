import { useStore } from "../../../stores/bound";
import React from "react";
import HeaderMobile from "../../../components/cardapioComponents/HeaderMobile";
import { CardProdutoCarrinho } from "../components/card-produto-carrinho";
import { Button } from "../../../componentes/button";
import { Separator } from "../../../componentes/separator";
import { Card } from "../../../componentes/card";
import { formatarParaBRL } from "../../../utils/formataParaBRL";
import { cfgtDD } from "../../../services/DD/cfgtDD";

export const CarrinhoPage = () => {
  const carrinho = useStore((state) => state.carrinho);
  const valorTotal = useStore((state) => state.valorTotal);
  const getConfiguracaoByCfgtId = useStore((state) => state.getConfiguracaoByCfgtId);
  
  const NUMERO_WHATSAPP = getConfiguracaoByCfgtId(cfgtDD.NUMERO_WHATSAPP_PEDIDO).texto;
  console.log("NUMERO_WHATSAPP",NUMERO_WHATSAPP)
  function handleEnviarPedido() {
    const produtosMsg = carrinho
      .map((produto) => `\n${produto.quantidade}x ${produto.nome}`)
      .join("");

    const mensagem = `🍔 NOVO PEDIDO 🍔    
    ${produtosMsg}
    
Valor Total: ${formatarParaBRL(valorTotal)}`;

    const linkWhatsApp = `http://api.whatsapp.com/send?phone=55${NUMERO_WHATSAPP}&text=${encodeURIComponent(
      mensagem
    )}`;

    window.open(linkWhatsApp);
  }

  return (
    <>
      <HeaderMobile />
      <section className="flex flex-col items-center px-2 md:px-4 py-5 bg-background h-full w-full">
        <div className="flex flex-col gap-3 mt-16 mb-3 w-full">
          {carrinho.map((produto) => (
            <CardProdutoCarrinho produto={produto} />
          ))}
        </div>
        <Separator />

        <Card className="mt-4 w-full p-4">
          <div className="flex flex-row items-center gap-2">
            <p className="text-lg font-medium">Total: </p>
            <p className="text-primary text-xl font-bold">
              {formatarParaBRL(valorTotal)}
            </p>
          </div>
        </Card>

        <Button
          className="flex gap-2 w-full mt-auto"
          onClick={handleEnviarPedido}
        >
          Enviar ao pedido
        </Button>
      </section>
    </>
  );
};
