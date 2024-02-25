import { ShoppingBag } from "lucide-react";
import { useStore } from "../../../stores/bound";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";

const HeaderMobile = () => {
  const quantidadeTotal = useStore((state) => state.quantidadeTotal);

  const { estUrl } = useParams();
  const estabelecimentoInfo = useStore((state) => state.estalecimentoCardapio);
  const categorias = useStore((state) => state.categoriasProdutos);

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
        <header className="flex justify-between items-center h-16 w-full bg-background px-5 py-2 lg:hidden z-20 backdrop-blur-md ">
          <div className="flex items-center">
            <Link to={`/${estUrl}`}>
              <img
                src={estabelecimentoInfo.logo}
                alt="Logo do Estabelecimento"
                className="h-12 w-auto object-cover z-50"
              />
            </Link>
          </div>

          <div className="flex gap-4">
            <Link to={`/${estUrl}/carrinho`} className="flex">
              <ShoppingBag className="text-2xl pointer" />
              <small className="absolute right-[3.3rem] top-2">{quantidadeTotal}</small>
            </Link>

            {displayNav === "hidden" ? (
              //@ts-ignore
              <AiOutlineMenu className="text-2xl pointer" onClick={handleNav} />
            ) : (
              //@ts-ignore
              <GrClose className="text-2xl pointer" onClick={handleNav} />
            )}
          </div>
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
