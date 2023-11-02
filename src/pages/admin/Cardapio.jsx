import React from 'react';
import Header from '../../components/adminComponents/Header'
import Main from '../../components/adminComponents/MainCardapio';
import HeaderMobile from '../../components/adminComponents/HeaderMobile';

const Cardapio = () => {
  return (
    <section >
      <HeaderMobile />
      <Header />
      <Main/>
    </section>
  )
}

export default Cardapio