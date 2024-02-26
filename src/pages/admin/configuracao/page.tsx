import React from "react";
import Header from "../../../components/adminComponents/Header";
import HeaderMobile from "../../../components/adminComponents/HeaderMobile";
import { Navigate } from "react-router-dom";
import Main from "./components/main";

export const Configuracao = () => {
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

