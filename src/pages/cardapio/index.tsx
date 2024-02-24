import React, { useEffect, useState } from "react";
import Header from "../../components/cardapioComponents/Header";
import axios from "axios";
import { useParams } from "react-router-dom";
import HeaderMobile from "../../components/cardapioComponents/HeaderMobile";
import { urlApi } from "../../constants/urlApi";
// @ts-ignore
import carregamento from "../../constants/carregamento.gif";
import PageError404 from "../erro404";
import { useEstabelecimentoDetalhe } from "../../stores/estabelecimento/use-estabelecimento-detalhe";
import { useStore } from "../../stores/bound";
import Main from "./components/main";
const url = urlApi;

const Cardapio = () => {
  const { estUrl } = useParams();
  const definirEstabelecimentoCardapio = useStore((state) => state.definirEstabelecimentoCardapio)
  const definirCategoriaProdutos = useStore((state) => state.definirCategoriaProdutos)

  const { data, isLoading, isError } = useEstabelecimentoDetalhe({ estUrl });

  if (isLoading) {
    <img src={carregamento} alt="" />;
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
        <Header/>
        <Main />
      </>
    );
  }
};

export default Cardapio;
