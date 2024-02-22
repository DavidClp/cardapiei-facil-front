import React from "react";
import Header from "../../components/adminComponents/Header";
import Main from "../../components/adminComponents/MainCardapio";
import HeaderMobile from "../../components/adminComponents/HeaderMobile";
import { Navigate } from "react-router-dom";

const Cardapio = () => {
  if (!sessionStorage.getItem("est_id")) {
    return <Navigate to="/" />;
  } else {
    return (
      <section className="min-h-[100vh] bg-background ">
        <HeaderMobile />
        <Header />
        <Main />
      </section>
    );
  }
};

export default Cardapio;
