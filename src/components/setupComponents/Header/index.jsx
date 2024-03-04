import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.webp";

import "./header.scss";

import { ButtonAjuda } from "../../basicosComponents/Buttons";

const Header = () => {
  return (
    <section className="header px-2">
      <div className="content">
        <div className="flex items-center">
          {/*         <Link to="/" className="mb-3"> */}
          <img src={logo} alt="Cardapiei Facil" className="w-24" />
          {/*       </Link> */}
          {/*   <Link to="/"> */}
          <p className="font-medium text-lg ml-2">Cardápiei Fácil</p>
          {/*     </Link> */}
        </div>

        {/*    <p>Você está a poucos passos de ter o seu cardápio online</p> */}
      </div>

      <Link to="https://wa.me/5569993404498" target="_blank">
        <ButtonAjuda />
      </Link>
    </section>
  );
};

export default Header;
