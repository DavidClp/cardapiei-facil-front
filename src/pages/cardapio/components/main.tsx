import React, { useRef, useState } from "react";
import "tailwindcss/tailwind.css";
import {CardProdutoDefault} from "./card-produto-default"
import {CardProdutoModern} from "./card-produto-modern"
import { useStore } from "../../../stores/bound";

const Main = () => {
  const categorias = useStore(
    (state) => state.categoriasProdutos
  );
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
    <section className="flex justify-center px-2 md:px-4 py-12 bg-background">
      <aside className="hidden lg:flex flex-col lg:w-[30%] lg:h-[80vh] sm:sticky sm:top-60 gap-4 overflow-y-hidden px-12 ">
        {categorias.map((categoria) => (
          <div
            key={categoria.id}
            className={`p-2 cursor-pointer rounded-lg shadow-sm transition ease-in-out delay-100 ${
              categoria.nome === categoriaAtiva ? "bg-background font-bold" : ""
            } `}
            onClick={() => scrollToCategoria(categoria.nome)}
          >
            <p className="capitalize">{categoria.nome}</p>
          </div>
        ))}
      </aside>

      <section
        className="flex flex-col gap-5 items-center justify-center w-full lg:w-[75%]"
        ref={menuRef}
      >
        {categorias.map((categoria, index) => (
          <div
            key={index}
            className="capitalize w-full menuCategoria space-y-3"
            data-categoria={categoria.nome}
            id={`categoria-${categoria.nome}`}
          >
            <h2 className="font-bold text-xl ">{categoria.nome}</h2>

            {categoria.Produtos.map((produto, index) => (
              <CardProdutoModern produto={produto} index={index}/>
            ))}
          </div>
        ))}
      </section>

    </section>
  );
};

export default Main;
