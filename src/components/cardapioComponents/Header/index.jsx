import React, { useState, useEffect } from "react";
import axios from "axios";
import { GrMapLocation } from "react-icons/gr";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
/* import './header.scss'; */

const Header = (props) => {
  const estabelecimentoInfo = props.estabelecimentoInfo;

  return (
    <>
      <section className="flex flex-col lg:flex-row items-center justify-center gap-2 p-2 bg-bgPrimary">
        <div className="mt-20 lg:mt-0 ls:mt-2">
          <img
            src={estabelecimentoInfo.logo}
            alt="Logo do Estabelecimento"
            className="w-40"
          />
        </div>

        <div className="flex mt-3 flex-col items-center">
          <h1 className="text-2xl font-bold">{estabelecimentoInfo.nome}</h1>
          <p className="text-lg mb-1 font-normal">
            {estabelecimentoInfo.descricao}
          </p>

          {estabelecimentoInfo?.Localizacaos?.map((localizacao, index) => (
            <div className="flex gap-3 my-2" key={index}>
              <GrMapLocation className="text-sm" />
              <p className="text-sm max-w-sm">
                {localizacao.endereco}, {localizacao.numero},{" "}
                {localizacao.bairro} - {localizacao.cidade}
              </p>
            </div>
          ))}

          <div className="space-y-1 my-2">
            {estabelecimentoInfo?.horario_atendimentos?.map(
              (horario, index) => (
                <p className="flex items-center gap-2 text-sm" key={index}>
                  <BiTimeFive className="text-sm" /> {horario.dia} das{" "}
                  {horario.hor_abre} às {horario.hor_fecha}
                </p>
              )
            )}
          </div>

          <div className="space-y-1 my-2">
            {estabelecimentoInfo?.Contatos?.map((contato, index) => (
              <p className="flex items-center gap-2 text-sm" key={index}>
                {contato.tipo == "whatsapp" && (
                  <BsWhatsapp className="text-sm" />
                )}
                {contato.tipo == "email" && (
                  <HiOutlineMail className="text-base" />
                )}
                {contato.tipo == "telefone" && (
                  <BsTelephone className="text-sm" />
                )}
                {contato.contato}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
