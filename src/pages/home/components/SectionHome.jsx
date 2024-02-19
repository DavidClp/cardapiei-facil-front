import React from "react";
import BannerBackground from "../Assets/home-banner-background.webp";
import imgCardapieiFacilMobile from "../Assets/cardapiei-facil-mobile.webp";
import imgCardapieiFacilPc from "../Assets/cardapiei-facil-pc.webp";
import { Link } from "react-router-dom";

const SectionHome = () => {
  return (
    <section className="home-container">
      {/* <Navbar /> */}
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="Fundo Azul" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Entregue um cardápio atrativo na palma da mão de seus clientes
          </h1>
          <p className="primary-text">
            Modernize seu estabelecimento, com seu cardápio online, entregando
            praticidadee para cria, atualizar e compartilhar com seus clientes.
          </p>
          <p className="text-center py-2">
            Comece já, a primeira semana é grátis para você testar 😍😍
          </p>

          <Link to="/cadastro">
            <button class="custom-btn btn-11">
              Crie seu Cardápio<div class="dot"></div>
            </button>
          </Link>
        </div>

        <div className="home-image-section">
          <picture>
            <source srcset={imgCardapieiFacilPc} media="(min-width: 1000px)" fetchpriority="high"/>
            <img
              src={imgCardapieiFacilMobile}
              alt="Tenha um cardápio online para seus clientes acessarem pelo celular."
              className="lg:w-[200%] "
              fetchpriority="high"
            />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default SectionHome;
