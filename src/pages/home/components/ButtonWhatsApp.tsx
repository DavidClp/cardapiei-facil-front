import React from "react";
import { Link } from "react-router-dom";
//@ts-ignore
import whatsapp from "../Assets/whatsapp.svg";

export const ButtonWhatsApp = () => {
  return (
    <Link to="https://wa.me/5569993404498" target="_blank" className="fixed z-50 bottom-4 right-4">
      <img src={whatsapp} alt="Whatsapp do Cardápiei Fácil" className="w-16 lg:w-20 animate-bounce" />
    </Link>
  );
};
