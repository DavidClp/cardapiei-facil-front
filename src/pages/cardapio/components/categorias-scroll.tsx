import React, { useRef, useState } from "react";
import { CategoriaListResponse } from "../../../services/produto/schemas/CategoriaListResponse";

interface Props {
  categorias: CategoriaListResponse;
  menuRef: useRef;
  categoriaScroll?: string;
}

export const CategoriasScroll = ({ categorias, menuRef, categoriaScroll }: Props) => {
  const [categoriaAtiva, setCategoriaAtiva] = useState(categorias[0].nome);

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
    <div className="flex sticky top-16 gap-3 py-2 overflow-x-scroll bg-background">
      {categorias.map((categoria) => (
        <div
          key={categoria.id}
          className={`p-2 cursor-pointer rounded-md border shadow-sm transition ease-in-out delay-100 shrink-0 ${
            categoria.nome === categoriaAtiva ? "bg-primary font-bold" : ""
          } `}
          onClick={() => scrollToCategoria(categoria.nome)}
        >
          <p className="capitalize text-sm">{categoria.nome}</p>
        </div>
      ))}
    </div>
  );
};
