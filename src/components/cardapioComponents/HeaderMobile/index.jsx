import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { GrClose } from "react-icons/gr";

const HeaderMobile = (props) => {
  const estabelecimentoCardapio = props.estabelecimentoCardapio;
  const { Categoria: categorias, ...estabelecimentoInfo } =
    estabelecimentoCardapio;

  const [displayNav, setDisplayNav] = useState("hidden");
  const [categoriaAtiva, setCategoriaAtiva] = useState(categorias[0].nome);

  const scrollToCategoria = (categoriaNome) => {
    const categoriaElement = document.getElementById(
      `categoria-${categoriaNome}`
    );

    if (categoriaElement) {
      setCategoriaAtiva(categoriaNome);
      categoriaElement.scrollIntoView({
        behavior: "smooth",
      });
      setDisplayNav("hidden");
    }
  };

  const handleNav = () => {
    if (displayNav === "hidden") {
      setDisplayNav("flex");
    } else {
      setDisplayNav("hidden");
    }
  };

  return (
    <>
      <div className="fixed w-full border-b border-bgSecondary z-10">
        <header className="flex justify-between items-center h-16 w-full bg-background px-5 py-2 lg:hidden z-20 backdrop-blur-md bg-[rgba(247,247,247,0.82)]">
          <div className="flex items-center">
            <img
              src={estabelecimentoInfo.logo}
              alt="Logo do Estabelecimento"
              className="h-12 w-auto object-cover z-50"
            />
          </div>
          {displayNav === "hidden" ? (
            <AiOutlineMenu className="text-2xl pointer" onClick={handleNav} />
          ) : (
            <GrClose className="text-2xl pointer" onClick={handleNav} />
          )}
        </header>

        <div
          className={`absolute flex-col top-20 left-[200%] rounded-md gap-4 px-12 z-50 h-max w-[90%] backdrop-blur-md bg-[rgba(247,247,247,0.82)] translate-x-[-50%] transition-colorsl  duration-300 ease-linear ${
            displayNav === "flex" && "left-[50%]"
          } drop-shadow-lg`}
        >
          {categorias.map((categoria) => (
            <div
              key={categoria.id}
              className={`p-2 cursor-pointer rounded-lg`}
              onClick={() => scrollToCategoria(categoria.nome)}
            >
              <p
                className={`capitalize text-center py-2 ${
                  categoria.nome === categoriaAtiva
                    ? "bg-background font-bold rounded-md"
                    : ""
                }`}
              >
                {categoria.nome}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeaderMobile;
