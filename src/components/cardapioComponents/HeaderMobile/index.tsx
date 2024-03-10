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
        <header className="flex justify-between items-center h-16 w-full bg-background px-5 py-2  z-20 backdrop-blur-md ">
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
              <small className="absolute right-[0.6rem] top-2">{quantidadeTotal}</small>
            </Link>

        
          </div>
        </header>
      </div>
    </>
  );
};

export default HeaderMobile;
