import React, { useRef } from "react";
import "tailwindcss/tailwind.css";
import {CardProdutoDefault} from "./card-produto-default"
import {CardProdutoModern} from "./card-produto-modern"
import { useStore } from "../../../stores/bound";
import { CategoriasScroll } from "./categorias-scroll";

const Main = () => {
  const categorias = useStore(
    (state) => state.categoriasProdutos
  );
  const menuRef = useRef(null); // Ref para a seção de menu

  return (
    <section className="flex flex-col justify-center px-2 md:px-4 py-12 bg-background">

    <CategoriasScroll categorias={categorias} menuRef={menuRef}/>

      <section
        className="flex flex-col gap-5 items-center justify-center w-full "
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
