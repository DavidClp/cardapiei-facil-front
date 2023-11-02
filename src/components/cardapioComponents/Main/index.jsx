import React, { useState, useRef } from "react";
/* import "./main.scss";*/
import "tailwindcss/tailwind.css";
import { formatarParaBRL } from "../../../utils/formataParaBRL";

const Main = (props) => {
  const categorias = props.categoriaComProdutos;
  const [categoriaAtiva, setCategoriaAtiva] = useState(categorias[0].nome);
  const menuRef = useRef(null); // Ref para a seção de menu

  const scrollToCategoria = (categoriaNome) => {
    if (menuRef.current) {
      const categoriaElement = menuRef.current.querySelector(
        `.menuCategoria[data-categoria="${categoriaNome}"]`
      );
      if (categoriaElement) {
        categoriaElement.scrollIntoView({ behavior: "smooth" });
        setCategoriaAtiva(categoriaNome);
      }
    }
  };
  return (
    <section className="flex justify-center px-2 md:px-4 py-12 bg-bgSecondary">
  <aside className="hidden lg:flex flex-col lg:w-[30%] lg:h-[80vh] sm:sticky sm:top-60 gap-4 overflow-y-hidden px-12 ">
        {categorias.map((categoria) => (
          <div
            key={categoria.id}
            className={`p-2 cursor-pointer rounded-lg shadow-sm transition ease-in-out delay-100 ${
              categoria.nome === categoriaAtiva ? "bg-bgPrimary font-bold" : ""
            } `}
            onClick={() => scrollToCategoria(categoria.nome)}
          >
            <p className="capitalize">{categoria.nome}</p>
          </div>
        ))}
      </aside>

      <section
        className="flex flex-col gap-5 items-center justify-center lg:w-[75%]"
        ref={menuRef}
      >
        {categorias.map((categoria, index) => (
          <div
            key={index}
            className="capitalize w-full menuCategoria"
            data-categoria={categoria.nome}
            id={`categoria-${categoria.nome}`}
          >
            <h2 className="font-bold text-xl mb-2">{categoria.nome}</h2>

            {categoria.Produtos.map((produto, index) => (
              <div
                key={index}
                className="flex items-center w-full bg-bgPrimary px-2 md:px-3 py-2 rounded mb-2 shadow-md  min-h-[4rem]"
              >
                <div className="">
                  {produto.imagem ? (
                    <img
                      src={produto.imagem}
                      alt="foto do produto"
                      className="w-28 h-24 md:w-20 md:h-20 rounded object-cover shadow-sm"
                    />
                  ) : null}
                </div>

                <div className="w-full px-2 md:px-4">
                  <div className="flex justify-between w-full items-center">
                    <h3 className="capitalize font-bold text-sm md:text-base">
                      {produto.nome}
                    </h3>

                    <span className="flex items-center bg-bgSecondary py-1 px-2 rounded shadow-sm">
                      <p className="text-xs">{formatarParaBRL(parseFloat(produto.valor))}</p>
                    </span>
                  </div>

                  <p className="text-sm md:text-base md:max-w-[90%]">
                    {produto.descricao != "null" && produto.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </section>
  );
};

export default Main;
