import React from "react";
import { GrMapLocation } from "react-icons/gr";
import { BiTimeFive } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";

const Header = (props) => {
  const estabelecimentoInfo = props.estabelecimentoInfo;

  return (
    <>
      <section className="flex flex-col lg:flex-row items-center justify-center gap-2 bg-background">
        <div className="mt-20 lg:mt-0 ls:mt-2">
          <img
            src={estabelecimentoInfo.logo}
            alt="Logo do Estabelecimento"
            className="w-40"
          />
        </div>

        <div className="flex mt-3 flex-col w-full px-6">
          <h1 className="text-2xl font-bold text-center">{estabelecimentoInfo.nome}</h1>
          <p className="text-lg mb-1 font-normal text-center">
            {estabelecimentoInfo.descricao}
          </p>

          {estabelecimentoInfo?.Localizacaos?.map((localizacao, index) => (
            <div className="flex my-2 flex- flex-col" key={index}>
              <p className="text-sm max-w-sm flex  gap-3">
              <GrMapLocation className="text-sm" />
                {localizacao.endereco && localizacao.endereco + " - "}
                {localizacao.numero !== 0 && localizacao.numero + " "}
                {localizacao.bairro && localizacao.bairro + " - "}
                {localizacao.cidade && localizacao.cidade}
              </p>
              <p className="text-sm max-w-sm text-center">
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
                {contato.tipo === "whatsapp" && (
                  <BsWhatsapp className="text-sm" />
                )}
                {contato.tipo === "email" && (
                  <HiOutlineMail className="text-base" />
                )}
                {contato.tipo === "telefone" && (
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
