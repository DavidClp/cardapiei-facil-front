import React, { useState, useRef } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { ButtonVerCardapio } from "../../basicosComponents/Buttons";
import { useQuery } from "react-query";
import axios from "axios";
import { urlApi } from "../../../constants/urlApi";
const url = urlApi
const urlBasica = "http://localhost:3000/";
const est_id = localStorage.getItem("est_id");

const HeaderMobile = () => {
  const [displayNav, setDisplayNav] = useState("hidden");

  const location = useLocation();
  //url
  const { data } = useQuery(["url", est_id], () => {
    return axios
      .get(`${url}api/estabelecimentos/get_url/${est_id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => response.data);
  });

  const handleNav = () => {
    if (displayNav === "hidden") {
      setDisplayNav("flex");
    } else {
      setDisplayNav("hidden");
    }
  };

  return (
    <>
      <div className="fixed w-full border-b border-bgSecondary z-10 lg:hidden">
        <header className="flex justify-between items-center h-20 w-full bg-bgPrimary px-5 py-2 z-20 backdrop-blur-md bg-[rgba(247,247,247,0.82)]">
          <div className="flex">
            <Link to="/admin/" className="mb-3">
              <img src={logo} alt="Cardapiei Facil" className="w-24" />
            </Link>
          </div>
          <div className="flex gap-4">
            <ButtonVerCardapio url={urlBasica + data} />
            {displayNav === "hidden" ? (
              <AiOutlineMenu className="text-3xl pointer" onClick={handleNav} />
            ) : (
              <GrClose className="text-3xl pointer" onClick={handleNav} />
            )}
          </div>
        </header>

        <div
          className={`absolute flex-col top-24 left-[200%] rounded-md gap-4 px-12 z-50 h-max w-[90%] backdrop-blur-md bg-[rgba(247,247,247,0.82)] translate-x-[-50%] transition-colorsl  duration-300 ease-linear ${
            displayNav === "flex" && "left-[50%]"
          }`}
        >
          <div className={`p-2 cursor-pointer rounded-lg`}>
            <Link
              to="/admin/estabelecimento"
              className={`link ${
                location.pathname === "/admin/estabelecimento" ? "select" : ""
              }`}
            >
              <p
                className={`capitalize text-center py-2 bg-bgPrimary rounded-md font-medium`}
              >
                Estabelecimento
              </p>
            </Link>
          </div>
          <div className={`p-2 cursor-pointer rounded-lg`}>
            <Link
              to="/admin/cardapio"
              className={`link ${
                location.pathname === "/admin/cardapio" ? "select" : ""
              }`}
            >
              <p
                className={`capitalize text-center py-2 bg-bgPrimary rounded-md font-medium`}
              >
                Cardapio
              </p>
            </Link>
          </div>
          <div className={`p-2 cursor-pointer rounded-lg`}>
            <Link
              to="/admin/divulgacao"
              className={`link ${
                location.pathname === "/admin/divulgacao" ? "select" : ""
              }`}
            >
              <p
                className={`capitalize text-center py-2 bg-bgPrimary rounded-md font-medium`}
              >
                Divulgação
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderMobile;
