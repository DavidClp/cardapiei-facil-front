import React from "react";
import Logo from "../Assets/logo.webp";
import  instagram from "../Assets/instagram.svg";
import  whatsapp from "../Assets/whatsapp.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>

    <div className="flex flex-col justify-center mt-10 lg:px-44">

      <div className="flex lg:flex-row flex-col gap-6 justify-between">
        
        <div className="flex flex-col items-center">
          <img src={Logo} alt="logo" className="w-44"/>
          <h3 className="font-semibold text-2xl">Cardápiei Fácil</h3>
          <p>cardapieifacil@gmail.com</p>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <Link to="https://wa.me/5569992733353" target="_blank">
            <img src={whatsapp} alt="Icon do Whatsapp" className="w-14"/>
          </Link>
          <Link to="https://www.instagram.com/cardapiei_facil/" target="_blank">
            <img src={instagram} alt="Icon do Whatsapp" className="w-14"/>
          </Link>
        </div>
      </div>


      <div className="flex flex-col gap-2  mt-8">
          <span>Termos e Condições</span>
          <span>Política de Privacidade</span>
      </div>

    </div>
      <div className="flex flex-col items-center mt-8 border-t-[1px] border-t-gray-200 py-3">
          <h4>Copyright 2023 Todos os Direitos Reservados</h4>
          <h4 className="font-medium">@CARDAPIEI_FACIL - Seu Cardápio Digital</h4>
      </div>
      </footer>
  );
};

export default Footer;
