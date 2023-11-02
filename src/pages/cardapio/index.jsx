import React, { useEffect, useState } from 'react';
import Header from '../../components/cardapioComponents/Header';
import Main from '../../components/cardapioComponents/Main';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import HeaderMobile from '../../components/cardapioComponents/HeaderMobile';
import { urlApi } from '../../constants/urlApi';
const url = urlApi

const Cardapio = () => {
  const { estabelecimento } = useParams();
  const [estabelecimentoCardapio, setEstabelecimentoCardapio] = useState({});
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    axios.get(`${url}api/estabelecimentos/${estabelecimento}`)
      .then((response) => {
        setEstabelecimentoCardapio(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [estabelecimento]);

   // Desestruture o objeto estabelecimentoCardapio para obter apenas o estabelecimento
   const { Categoria, ...estabelecimentoInfo } = estabelecimentoCardapio;

/*    console.log(categorias.Produtos);
 */  return (
    <>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <HeaderMobile estabelecimentoCardapio={estabelecimentoCardapio}/>
          <Header estabelecimentoInfo={estabelecimentoInfo}/>
          <Main categoriaComProdutos={Categoria} />
        </>
      )}
    </>
  );
}

export default Cardapio;
