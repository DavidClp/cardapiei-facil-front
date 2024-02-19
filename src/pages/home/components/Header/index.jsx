import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/logo.webp";

import { BsFillPersonFill } from "react-icons/bs";

const Header = () => {
  return (
    <header className="header23 hidden lg:hidden">
      <div className="content">
        <div className="logo">
          <Link to="/admin/" className="link">
            <img src={logo} alt="Cardapiei Facil" />
          </Link>
        </div>

        <nav>
          <Link to="/planos">
            <p className="font-medium">Planos</p>
          </Link>
        </nav>
      </div>

      <Link to="/login">
        <div className="flex items-center justify-center gap-2">
          <BsFillPersonFill className="w-6 h-6" />
          <p>Entrar</p>
        </div>
      </Link>
    </header>
  );
};

export default Header;
