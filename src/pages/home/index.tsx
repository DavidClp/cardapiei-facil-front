import React from "react";
import "./App.css";
import SectionHome from "./components/SectionHome";
import About from "./components/About";
import Work from "./components/Work";
import Testimonial from "./components/Testimonial";
import Footer from "./components/Footer";
import HeaderMobile from "./components/HeaderMobile";
import Header from "./components/Header";
import { ChamadaAcao } from "./components/chamadaAcao";
import { ButtonWhatsApp } from "./components/ButtonWhatsApp";
import { InfoDelivery } from "./components/InfoDelivery";

const Home = () => {
  return (
    <>
      <HeaderMobile />
      <Header />
      <ButtonWhatsApp/>
      <div className="App">
        <SectionHome />
        <InfoDelivery/>
        <About />
        <Work />
        <Testimonial />
        <ChamadaAcao />
        <Footer />
      </div>
    </>
  );
};

export default Home;
