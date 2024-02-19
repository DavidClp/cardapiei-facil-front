import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import logo from "../../../../assets/logo.webp";
import { BsFillPersonFill } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa6";

const HeaderMobile = () => {
  const [displayNav, setDisplayNav] = useState("hidden");

  const handleNav = () => {
    if (displayNav === "hidden") {
      setDisplayNav("flex");
    } else {
      setDisplayNav("hidden");
    }
  };

  return (
    <header>
      <div className="fixed w-full shadow z-10 lg:hidden">
        <div className="flex justify-between items-center h-20 w-full bg-background px-5 py-2 z-20">
          <div className="flex items-center">
            <Link to="/" className="mb-3">
              <img src={logo} alt="Cardapiei Facil" className="w-24" />
            </Link>
            <Link to="/">
            <p className="font-medium text-lg ml-2">Cardápiei Fácil</p>
            </Link>
          </div>
          <div className="flex gap-4">
            {displayNav === "hidden" ? (
              <AiOutlineMenu className="text-3xl pointer" onClick={handleNav} />
            ) : (
              <GrClose className="text-3xl pointer" onClick={handleNav} />
            )}
          </div>
        </div>

        <div
          className={`absolute flex-col top-24 left-[200%] rounded-md gap-14 px-4 py-10 z-40 h-max w-[90%] backdrop-blur-md bg-[rgba(247,247,247,0.82)] translate-x-[-50%]  duration-300 ease-linear ${
            displayNav === "flex" && "left-[50%]"
          }`}
        >
          <div className="flex flex-col items-center gap-8">
            <Link to="/planos">
              <p className="font-medium text-lg">Planos</p>
            </Link>

            <Link to="/login">
              <div className="flex items-center justify-center gap-2">
              <FaRegUser className="font-semibold text-xl" />
                <p className="text-lg">Entrar</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderMobile;
