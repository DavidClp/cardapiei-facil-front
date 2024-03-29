import {useState} from "react"
import { useProdutoDetalhe } from "../../../stores/produto/use-produto-detalhe";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../componentes/card";
import React from "react";
import { useParams } from "react-router-dom";
import HeaderMobile from "../../../components/cardapioComponents/HeaderMobile";
import { formatarParaBRL } from "../../../utils/formataParaBRL";
import { Button } from "../../../componentes/button";
import { PlusCircle } from "lucide-react";
import { useStore } from "../../../stores/bound";
import Toast from "../../../components/basicosComponents/toast";

export const ProdutoDetalhe = () => {
  const { proId } = useParams();

  const [ativarToast, setAtivarToast] = useState(false)

  const { data: produtoData, isLoading } = useProdutoDetalhe({ proId });

  const addCarrinho = useStore((state) => state.addCarrinho);
  const calcularValorTotal = useStore((state) => state.calcularValorTotal);
  const calcularQuantidadeTotal = useStore((state) => state.calcularQuantidadeTotal);

  function handleAdicionarProduto() {
    addCarrinho(produtoData);
    calcularQuantidadeTotal();
    calcularValorTotal();
    setAtivarToast(true);
  }

  if (isLoading) {
    <section className="flex justify-center px-2 md:px-4 py-12 bg-background h-full">
      <Card>
        <CardContent>carregando</CardContent>
      </Card>
    </section>;
  }
  if (produtoData) {
    return (
      <>
      {ativarToast ? <Toast type="success"> {produtoData?.nome} Adicionado ao Carrinho!</Toast> : null}
      <HeaderMobile/>
        <section className="flex justify-center px-2 md:px-4 py-5 bg-background min-h-full">
          <Card className="mt-16 flex flex-col w-full">
            <CardHeader className="space-y-">
              <div className="flex justify-center mb-6">
                {produtoData?.imagem && (
                  <img
                    src={produtoData?.imagem}
                    alt={produtoData.nome}
                    className="w-full md:w-[70%] lg:w-[40%] rounded object-cover shadow-sm"
                  />
                )}
              </div>
              <CardTitle className="text-left">{produtoData.nome}</CardTitle>
              <h2 className="text-primary text-xl font-bold">
                {formatarParaBRL(produtoData.valor)}
              </h2>
            </CardHeader>

            <CardContent>
              <p>{produtoData.descricao}</p>
            </CardContent>

            <CardFooter className="mt-auto">
              <Button className="flex gap-2 w-full" onClick={handleAdicionarProduto}>
                <PlusCircle className="w-4" />
                Adicionar ao pedido
              </Button>
            </CardFooter>
          </Card>
        </section>
      </>
    );
  }
};
