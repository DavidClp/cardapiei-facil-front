import React from "react";
import AboutBackground from "../Assets/about-background.webp";
import painelAdminImg from "../Assets/painel-admin-cardapiei-facil.webp";

import { Link } from "react-router-dom";
import { ButtonHomePage } from "../../../components/basicosComponents/Buttons";

const About = () => {
  return (
    <section className="mt-44 w-full flex flex-col lg:flex-row justify-center items-center">  
      <div className="about-background-image-container">
      </div>

      <div className="w-full h-full lg:max-w-[55%]">
        <img src={painelAdminImg} alt="Dashboard do Cardápio Digital" className="drop-shadow-md" fetchpriority="high"/>
      </div>
      <div className="flex flex-col items-center text-left px-3">
        <h2 className="primary-heading">Gerencie você mesmo seu Cardápio Digital</h2>
        <p className="primary-text">
          Chega de ficar mandando imprimir seu cardápio toda vez que tiver uma
          alteração, ou pior!! Ficar riscando de caneta em cima para editar um
          preço ou um produto que não está mais disponível.
        </p>
        <p className="primary-text">
          Com o Cardápiei Fácil, você tem um painel administrador muito fácil e
          intuitivo para gerenciar todo o seu Cardápio digital! 
        </p>
        <div className="about-buttons-container">
          <Link to="/planos#top">
          <ButtonHomePage>Planos</ButtonHomePage>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
