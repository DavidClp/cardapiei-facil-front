import React from 'react'
import Header from '../../components/adminComponents/Header'
import Main from '../../components/adminComponents/MainEstabeelcimento';
import HeaderMobile from '../../components/adminComponents/HeaderMobile';

const Estabelecimento = () => {
  return (
    <section>
      <HeaderMobile />
      <Header/>
      <Main/>
    </section>
  )
}

export default Estabelecimento