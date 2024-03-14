import React from "react";
import CarrinhoDelivery from "../Assets/carrinho-delivery.webp";

import { Link } from "react-router-dom";
import { ButtonHomePage } from "../../../components/basicosComponents/Buttons";

export const InfoDelivery = () => {
  return (
    <section className="mt-10 w-full flex flex-col lg:flex-row justify-center items-center">  
      <div className="about-background-image-container">
      </div>

      <div className="w-full h-full md:max-w-[70%] lg:max-w-[40%]">
        <img src={CarrinhoDelivery} alt="Carrinho de produtos para enviar WhatsApp" className="drop-shadow-md" fetchpriority="medium" widtd="945px" height="1022px"/>
      </div>
      <div className="flex flex-col px-3 xl:w-[50%]">
        <h3 className="text-2xl lg:text-3xl mt-10 lg:mt-0 mb-6">Com o Cardápiei, não precisa se preocupar em anotar o pedido do seu cliente...</h3>
        <h3 className="text-2xl lg:text-3xl text-primary font-semibold">Ele mesmo vai fazer isso de maneira fácil e rápida</h3>
       
        <div className="about-buttons-container items-center">
          <Link to="https://wa.me/5569993404498">
          <ButtonHomePage>Chamar no WhatsApp para Começar</ButtonHomePage>
          </Link>
        </div>
      </div>
    </section>
  );
};

