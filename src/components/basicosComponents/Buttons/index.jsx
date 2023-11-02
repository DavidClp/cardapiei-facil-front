import React from 'react'
import './buttons.scss';
import { BsBoxArrowUpRight, BsEye, BsEyeSlash, BsWhatsapp } from 'react-icons/bs';
import { BiSolidMessageSquareAdd } from 'react-icons/bi';
import { GrPrevious } from 'react-icons/gr';
import { MdDeleteForever } from 'react-icons/md';

const ButtonForm = () => {
  return (
    <button type="submit" className='buttonForm'>
      salvar
    </button>
  )
}

const ButtonCadastrar = () => {
  return (
    <button type="submit" className='buttonCadastrar'>
      Criar Cardapio
    </button>
  )
}

const ButtonEfeite = ({texto, onClick}) => {
  return (
    <button type="submit" className='buttonCadastrar' onClick={onClick}>
      {texto}
    </button>
  )
}

const ButtonLogin = () => {
  return (
    <button type="submit" className='buttonCadastrar'>
      Entrar
    </button>
  )
}

const ButtonAvancar = () => {
  return (
    <button type="submit"  className='buttonAvancar'>
      próximo
    </button>
  )
}

const ButtonAvancar2 = ({ setPassoAtual }) => {
  return (
    <button type='button' onClick={() => setPassoAtual((passoAtual) => passoAtual + 1)}   className='buttonAvancar'>
      próximo
    </button>
  )
}
const ButtonAdd = () => {
  return (
    <button type="submit" className='buttonAdd'>
      <BiSolidMessageSquareAdd className="icon"/>
    </button>
  )
}

const ButtonComIcon = ({children, onClick}) => {
  return (
    <button type="submit" className='buttonAdd' onClick={onClick}>
      {children}
    </button>
  )
}

const ButtonVoltar = ({ onClick }) => {
  return (
    <a href="#" onClick={onClick} className='buttonVoltar'>
      <GrPrevious />
      voltar
    </a>
  );
};
const ButtonVerCardapio = ({url}) => {
  const handleClick = () => {
    window.open(url, '_blank');
  };
  return (
    <button type="submit" className='flex items-center gap-1 py-2 px-5 bg-primary text-corTextSecundaria rounded-md text-sm' onClick={handleClick}>
      <BsBoxArrowUpRight className="icon"/>
      Ver o cardapio
    </button>
  )
}


const ButtonRemove = ({ onClick }) => {
  return (
    <button className='buttonRemove' onClick={ onClick }>
      <MdDeleteForever className="icon"/>
    </button>
  )
}

const ButtonAtivo = ({ onClick }) => {
  return (
    <button className='buttonRemove' onClick={ onClick }>
      <BsEye className="icon"/>
    </button>
  )
}

const ButtonInativo = ({ onClick }) => {
  return (
    <button className='buttonRemove' onClick={ onClick }>
      <BsEyeSlash className="icon"/>
    </button>
  )
}

const ButtonSimples = ({ children, onClick }) => {
  return (
    <button className='buttonRemove' onClick={ onClick }>
      <MdDeleteForever className="icon"/>
      {children}
    </button>
  )
}

const ButtonDivulgacao = ({ children, onClick }) => {
  return (
    <button className='buttonDivulgacao' onClick={ onClick }>
      {children}
    </button>
  )
}

const ButtonAjuda = () => {
  return (
    <button className='buttonAjuda'>
      <BsWhatsapp className="icon"/>
      Precisa de ajuda?
    </button>
  )
}


export {
  ButtonForm,
  ButtonVerCardapio,
  ButtonAdd,
  ButtonRemove,
  ButtonAjuda,
  ButtonAvancar,
  ButtonAvancar2,
  ButtonVoltar,
  ButtonLogin,
  ButtonCadastrar,
  ButtonEfeite,
  ButtonSimples,
  ButtonComIcon,
  ButtonDivulgacao,
  ButtonAtivo,
  ButtonInativo
} 