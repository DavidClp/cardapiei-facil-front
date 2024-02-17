import React from "react";
import "./buttons.scss";
import {
  BsBoxArrowUpRight,
  BsEye,
  BsEyeSlash,
  BsWhatsapp,
} from "react-icons/bs";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { GrPrevious } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";

const ButtonForm = () => {
  return (
    <button
      type="submit"
      className="bg-primary inline-block text-center py-2 px-12 rounded font-medium text-primary-foreground hover:bg-primaryHover text-base shadow-md transition-colors delay-75"
    >
      salvar
    </button>
  );
};

const ButtonCadastrar = () => {
  return (
    <button type="submit" className="bg-primary inline-block text-center py-2 px-12 rounded font-medium text-primary-foreground hover:bg-primaryHover text-base shadow-md transition-colors delay-75 mt-8">
      Criar Cardápio
    </button>
  );
};

const ButtonFakeLoading = () => {
  return (
    <button className="bg-gray-400 inline-block text-center py-2 px-12 rounded font-medium text-primary-foreground text-base shadow-md transition-colors delay-75 mt-8 cursor-default">
      Criando estabelecimento...
    </button>
  );
};

const ButtonEfeite = ({ texto, onClick }) => {
  return (
    <button
      type="submit"
      className="bg-primary inline-block text-center py-2 px-4 rounded-sm font-medium text-primary-foreground hover:bg-primaryHover text-base shadow-md transition-colors delay-75"
      onClick={onClick}
    >
      {texto}
    </button>
  );
};

const ButtonLogin = () => {
  return (
    <button type="submit" className="bg-primary inline-block text-center py-2 px-12 rounded font-medium text-primary-foreground hover:bg-primaryHover text-base shadow-md transition-colors delay-75 mt-8">
      Entrar
    </button>
  );
};

const ButtonAvancar = () => {
  return (
    <button type="submit" className="bg-primary inline-block text-center py-2 px-12 rounded font-medium text-primary-foreground hover:bg-primaryHover text-base shadow-md transition-colors delay-75 mt-8">
      próximo
    </button>
  );
};

const ButtonAvancar2 = ({ setPassoAtual }) => {
  return (
    <button
      type="button"
      onClick={() => setPassoAtual((passoAtual) => passoAtual + 1)}
      className="bg-primary inline-block text-center py-2 px-4 rounded-sm font-medium text-primary-foreground hover:bg-primaryHover text-base shadow-md transition-colors delay-75"
    >
      próximo
    </button>
  );
};
const ButtonAdd = () => {
  return (
    <button
      type="submit"
      className="flex items-center justify-center bg-primary hover:bg-primaryHover rounded text-base w-10 h-9 lg:w-10 lg:h-10 text-primary-foreground pointer shadow-sm"
    >
      <BiSolidMessageSquareAdd className="icon" />
    </button>
  );
};

const ButtonComIcon = ({ children, onClick }) => {
  return (
    <button
      type="submit"
      className="flex items-center justify-center bg-primary hover:bg-primaryHover rounded text-base w-7 h-7 lg:w-10 lg:h-10 text-primary-foreground pointer shadow-sm"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const ButtonVoltar = ({ onClick }) => {
  return (
    <a href="#" onClick={onClick} className="buttonVoltar">
      <GrPrevious />
      voltar
    </a>
  );
};
const ButtonVerCardapio = ({ url }) => {
  const handleClick = () => {
    window.open(url, "_blank");
  };
  return (
    <button
      type="submit"
      className="flex items-center gap-1 py-2 px-5 bg-primary text-primary-foreground rounded text-sm"
      onClick={handleClick}
    >
      <BsBoxArrowUpRight className="icon" />
      Ver o cardapio
    </button>
  );
};

const ButtonRemove = ({ onClick }) => {
  return (
    <button
      className="flex items-center justify-center bg-primary hover:bg-primaryHover rounded text-base w-8 h-8 lg:w-10 lg:h-10 text-primary-foreground pointer shadow-sm"
      onClick={onClick}
    >
      <MdDeleteForever className="icon" />
    </button>
  );
};

const ButtonAtivo = ({ onClick }) => {
  return (
    <button
      className="flex items-center justify-center bg-primary hover:bg-primaryHover rounded text-base w-8 h-8 lg:w-10 lg:h-10 text-primary-foreground pointer shadow-sm"
      onClick={onClick}
    >
      <BsEye className="icon" />
    </button>
  );
};

const ButtonInativo = ({ onClick }) => {
  return (
    <button
      className="flex items-center justify-center bg-primary hover:bg-primaryHover rounded text-base w-8 h-8 lg:w-10 lg:h-10 text-primary-foreground pointer shadow-sm"
      onClick={onClick}
    >
      <BsEyeSlash className="icon" />
    </button>
  );
};

const ButtonSimples = ({ children, onClick }) => {
  return (
    <button
      className="flex items-center justify-center bg-primary hover:bg-primaryHover rounded text-base w-7 h-7 lg:w-10 lg:h-10 text-primary-foreground pointer shadow-sm"
      onClick={onClick}
    >
      <MdDeleteForever className="icon" />
      {children}
    </button>
  );
};

const ButtonCancelar = ({ children, onClick }) => {
  return (
    <button
      className="bg-gray-400 inline-block text-center py-2 px-4 rounded-sm font-medium text-primary-foreground h-auto hover:bg-gray-600 text-base shadow-md transition-colors delay-75"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const ButtonHomePage = ({ children, onClick }) => {
  return <button class="plano-btn btn-12" onClick={onClick}>{children}</button>;
};

const ButtonDivulgacao = ({ children, onClick }) => {
  return (
    <button className="buttonDivulgacao" onClick={onClick}>
      {children}
    </button>
  );
};

const ButtonAjuda = () => {
  return (
    <button className="buttonAjuda">
      <BsWhatsapp className="icon" />
      Precisa de ajuda?
    </button>
  );
};

export {
  ButtonForm,
  ButtonVerCardapio,
  ButtonAdd,
  ButtonRemove,
  ButtonAjuda,
  ButtonAvancar,
  ButtonAvancar2,
  ButtonFakeLoading,
  ButtonVoltar,
  ButtonLogin,
  ButtonCadastrar,
  ButtonEfeite,
  ButtonSimples,
  ButtonComIcon,
  ButtonDivulgacao,
  ButtonAtivo,
  ButtonInativo,
  ButtonHomePage,
  ButtonCancelar
};
