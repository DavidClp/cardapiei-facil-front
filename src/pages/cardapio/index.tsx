import React from "react";
import Header from "../../components/cardapioComponents/Header";
import { useParams } from "react-router-dom";
import HeaderMobile from "../../components/cardapioComponents/HeaderMobile";
import { urlApi } from "../../constants/urlApi";
// @ts-ignore
import carregamento from "../../constants/carregamento.gif";
import PageError404 from "../erro404";
import { useStore } from "../../stores/bound";
import Main from "./components/main";
import { useConfiguracaoEstabelecimento } from "../../stores/configuracao/use-configuracao-estabelecimento";
import { useEstabelecimentoDetalhe } from "../../stores/estabelecimento/use-estabelecimento-detalhe";
const url = urlApi;

const Cardapio = () => {
  const { estUrl } = useParams();
  const definirEstabelecimentoCardapio = useStore(
    (state) => state.definirEstabelecimentoCardapio
  );
  const definirCategoriaProdutos = useStore(
    (state) => state.definirCategoriaProdutos
  );
  const definirConfiguracoes = useStore((state) => state.definirConfiguracoes);

  const { data, isLoading, isError } = useEstabelecimentoDetalhe({ estUrl });

  const { data: dataConfiguracao } = useConfiguracaoEstabelecimento({
    estId: data?.id,
  });
  if (dataConfiguracao) definirConfiguracoes(dataConfiguracao);

  if (isLoading) {
    <img src={carregamento} alt="carregando..." />;
  }
  if (isError) {
    <PageError404 />;
  }

  if (data) {
    const estabelecimentoCardapio = data;

    // Desestruture o objeto estabelecimentoCardapio para obter apenas o estabelecimento
    const { Categoria, ...estabelecimentoInfo } = estabelecimentoCardapio;

    definirEstabelecimentoCardapio(estabelecimentoInfo);
    definirCategoriaProdutos(Categoria);

    return (
      <>
        <HeaderMobile />
        <Header />
        <Main />
      </>
    );
  }
};

export default Cardapio;
