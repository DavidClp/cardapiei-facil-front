import React, { useState, useEffect } from "react";
import "./main.scss";
import {
  ButtonDivulgacao,
  ButtonEfeite,
} from "../../basicosComponents/Buttons";
import Modal from "../../basicosComponents/Modal";
import axios from "axios";
import { ImLink } from "react-icons/im";
import { AiOutlineQrcode } from "react-icons/ai";
import { urlSite } from "../../../constants/urlApi";
import { Navigate } from "react-router-dom";

const urlPadrao = urlSite;
/* const UrlCliente = urlPadrao + localStorage.getItem("est_url"); */

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [imageUrl, setImageUrl] = useState("");
  const UrlCliente = urlPadrao + sessionStorage.getItem("est_url");

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const imageSize = "300x300"; // Especifique o tamanho desejado

    const getQRCode = async () => {
      const url = `http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        UrlCliente
      )}&size=${imageSize}&margin=25&bgcolor=FFFFFF&color=000000`;

      try {
        const response = await axios.get(url, {
          responseType: "blob",
        });

        if (response.status === 200) {
          const blob = response.data;
          const imageUrl = window.URL.createObjectURL(blob);
          setImageUrl(imageUrl);
        }
      } catch (error) {
        console.error("Erro ao buscar o QR Code:", error);
      }
    };

    getQRCode();
  }, [UrlCliente]); // O array vazio significa que este efeito é executado uma vez, quando o componente é montado

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "qrcode.png";
      link.click();
    }
  };

  const copiarUrl = () => {
    // Cria um elemento de input para copiar o texto
    const input = document.createElement("input");
    input.value = UrlCliente;
    document.body.appendChild(input);

    // Seleciona o texto no input
    input.select();

    // Copia o texto para a área de transferência
    document.execCommand("copy");

    // Remove o elemento de input
    document.body.removeChild(input);

    // Notifica o usuário que o texto foi copiado
    /*  alert('Texto copiado para a área de transferência: ' + UrlCliente); */
  };

  const qrCodeConteudo = (
    <>
      <div className="flex items-center justify-center flex-col">
        <h3 className="mb-2 font-medium">Baixe o QR CODE do seu Cardápio</h3>
        <div className="mb-4">
          {imageUrl && <img src={imageUrl} alt="QR CODE" />}
        </div>

        <ButtonEfeite
          texto="Baixe o QR Code"
          onClick={() => handleDownload()}
        />
      </div>
    </>
  );

  const linkConteudo = (
    <>
      <div className="flex items-center justify-center flex-col">
        <h3 className="font-medium">Copie o link do seu cardápio</h3>
        <p className="py-4 max-w-xl">
          Esse é o link para o seu cardápio. Envie para seus clientes pelo
          Whatsapp, redes sociais ou inclua em seus materiais publicitários para
          que seus clientes possam acessar facilmente seu cardápio digital.
        </p>

        <div>
          <p className="font-medium mb-2">{UrlCliente}</p>
        </div>

        <ButtonEfeite texto="Copiar o link" onClick={copiarUrl} />
      </div>
    </>
  );

  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  return (
    <section className="flex flex-col lg:flex-row justify-center min-h-[100vh] gap-8 items-center">
      <ButtonDivulgacao
        onClick={() => openModal(linkConteudo)}
        className="bg-background mt-20 lg-mt-0"
      >
        <ImLink className="icon " />
        Gerar Link do Cardápio
      </ButtonDivulgacao>

      <ButtonDivulgacao onClick={() => openModal(qrCodeConteudo)}>
        <AiOutlineQrcode className="icon" />
        Gerar QR Code
      </ButtonDivulgacao>

      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        {modalContent}
      </Modal>
    </section>
  );
};

export default Main;
