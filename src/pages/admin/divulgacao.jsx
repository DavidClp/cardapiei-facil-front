import React from 'react'
import Header from '../../components/adminComponents/Header'
import Main from '../../components/adminComponents/MainDivulgacao';
import HeaderMobile from '../../components/adminComponents/HeaderMobile';

const Divulgacao = () => {
  return (
    <section>
      <HeaderMobile />
      <Header/>
      <Main/>
    </section>
  )
}

export default Divulgacao