import React from "react";
import { GrMapLocation } from "react-icons/gr";
import { BiTimeFive } from "react-icons/bi";
import { BsWhatsapp } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { useStore } from "../../../stores/bound";

const Header = () => {
  const estalecimentoCardapio = useStore(
    (state) => state.estalecimentoCardapio
  );
  return (
    <>
      <section className="flex flex-col lg:flex-row items-center justify-center gap-2 bg-background">
        <div className="mt-20 lg:mt-24">
          {estalecimentoCardapio.logo && (
            <img
              src={estalecimentoCardapio.logo}
              alt="Logo do Estabelecimento"
              className={`w-40`}
            />
          ) }
        </div>

        <div className="flex mt-3 flex-col w-full px-6">
          <h1 className="text-2xl font-bold text-center">
            {estalecimentoCardapio.nome}
          </h1>
          <p className="text-lg mb-1 font-normal text-center">
            {estalecimentoCardapio.descricao}
          </p>

          {estalecimentoCardapio?.Localizacaos?.map((localizacao, index) => (
            <div className="flex my-2 flex- flex-col" key={index}>
              <p className="text-sm max-w-sm flex  gap-3">
                {/* @ts-ignore */}
                <GrMapLocation className="text-sm" />
                {localizacao.endereco && localizacao.endereco + " - "}
                {localizacao.numero !== 0 ? localizacao.numero + " " : ""}
                {localizacao.bairro && localizacao.bairro + " - "}
                {localizacao.cidade && localizacao.cidade}
              </p>
              <p className="text-sm max-w-sm text-center"></p>
            </div>
          ))}

          <div className="space-y-1 my-2">
            {estalecimentoCardapio?.horario_atendimentos?.map(
              (horario, index) => (
                <p className="flex items-center gap-2 text-sm" key={index}>
                  {/* @ts-ignore */}
                  <BiTimeFive className="text-sm" /> {horario.dia} das{" "}
                  {horario.hor_abre} às {horario.hor_fecha}
                </p>
              )
            )}
          </div>

          <div className="space-y-1 my-2">
            {estalecimentoCardapio?.Contatos?.map((contato, index) => (
              <p className="flex items-center gap-2 text-sm" key={index}>
                {contato.tipo === "whatsapp" && (
                  <>
                    {/* @ts-ignore */}
                    <BsWhatsapp className="text-sm" />
                  </>
                )}
                {contato.tipo === "email" && (
                  <>
                    {/* @ts-ignore */}
                    <HiOutlineMail className="text-base" />
                  </>
                )}
                {contato.tipo === "telefone" && (
                  <>
                    {/* @ts-ignore */}
                    <BsTelephone className="text-sm" />
                  </>
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
