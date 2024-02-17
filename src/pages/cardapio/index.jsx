import React, { useEffect, useState } from "react";
import Header from "../../components/cardapioComponents/Header";
import Main from "../../components/cardapioComponents/Main";
import axios from "axios";
import { useParams } from "react-router-dom";
import HeaderMobile from "../../components/cardapioComponents/HeaderMobile";
import { urlApi } from "../../constants/urlApi";
import carregamento from "../../constants/carregamento.gif";
import PageError404 from "../erro404";
const url = urlApi;

const Cardapio = () => {
  const { estabelecimento } = useParams();
  const [estabelecimentoCardapio, setEstabelecimentoCardapio] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`${url}api/estabelecimentos/${estabelecimento}`)
      .then((response) => {
        setEstabelecimentoCardapio(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(true)
        setIsLoading(false);
        console.error(error);
      });
  }, [estabelecimento]);

  // Desestruture o objeto estabelecimentoCardapio para obter apenas o estabelecimento
  const { Categoria, ...estabelecimentoInfo } = estabelecimentoCardapio;

  return (
    <>
      {isLoading ? (
        <img src={carregamento} alt="" />
      ) : error ? (
        <PageError404/>
      ) : (
        <>
          <HeaderMobile estabelecimentoCardapio={estabelecimentoCardapio} />
          <Header estabelecimentoInfo={estabelecimentoInfo} />
          <Main categoriaComProdutos={Categoria} />
        </>
      )}
    </>
  );
};

export default Cardapio;
