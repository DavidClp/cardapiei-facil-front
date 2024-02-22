import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.webp";
import { ButtonVerCardapio } from "../../basicosComponents/Buttons";
import { BsFillPersonFill } from "react-icons/bs";
import "./header.scss";

import { urlSite } from "../../../constants/urlApi";
import { useStore } from "../../../stores/bound";
const usuario = JSON.parse(localStorage.getItem("usuario"));
const urlBasica = urlSite;

const Header = () => {
  const location = useLocation();

  const estUrl = useStore((state) => state.estUrl);

  //url
  /* const { data } = useQuery(["url", est_id], () => {
    return axios.get(`${url}api/estabelecimentos/get_url/${est_id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }); */

  return (
    <section className="header23 hidden lg:flex">
      <div className="content">
        <div className="logo">
          <Link to="/admin/" className="link">
            <img src={logo} alt="Cardapiei Facil" />
          </Link>
        </div>
        <ButtonVerCardapio url={urlBasica + estUrl} />

        <nav>
          <ul>
            <li>
              <Link
                to="/admin/estabelecimento"
                className={`link ${
                  location.pathname === "/admin/estabelecimento" ? "select" : ""
                }`}
              >
                Estabelecimento
              </Link>
            </li>
            <li>
              <Link
                to="/admin/cardapio"
                className={`link ${
                  location.pathname === "/admin/cardapio" ? "select" : ""
                }`}
              >
                Cardápio
              </Link>
            </li>
            <li>
              <Link
                to="/admin/divulgacao"
                className={`link ${
                  location.pathname === "/admin/divulgacao" ? "select" : ""
                }`}
              >
                Divulgação
              </Link>
            </li>
          </ul>
        </nav>
      </div>

    {/*   <Link to="/admin/perfil"> */}
        <div className="perfil">
          <BsFillPersonFill className="icon" />
          {usuario?.nome}
        </div>
     {/*  </Link> */}
    </section>
  );
};

export default Header;
