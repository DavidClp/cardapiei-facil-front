import React from "react";
import { AiOutlineQrcode } from "react-icons/ai";
import { CiImageOn } from "react-icons/ci"

const Work = () => {
  const workInfoData = [
    {
      image: <AiOutlineQrcode className="icon" />,
      title: "Compartilhe Fácil",
      text: "Compartilhe o seu cardápio digital enviando o Link ou disponibilizando o QR Code que é gerado automaticamente.",
    },
    {
      image: <CiImageOn className="icon" />,
      title: "Mostre seu produto",
      text: "Chega de ficar enchendo a galeria de seus clientes com fotos do seus produtos, anexe a imagem no cardápio e mande apenas um link para seus clientes 😉",
      }/* ,
      {
        image: <AiOutlineQrcode className="icon" />,
        title: "Fast Deliveries",
        text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
      }, */
  ];
  return (
    <section className="work-section-wrapper">
      <div className="work-section-top">
        <h1 className="primary-heading">Sem preocupação com as coisas simples </h1>

        <p className="primary-text">
        Deixe de ser preocupar com as coisas que deveriam ser fáceis, como alterar rapidamente um item para a noite ou compartilhar facilmente seu cardápio com seus clientes.
        </p>
      </div>

      <div className="work-section-bottom">

        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              {data.image}
            </div>
            <h2>{data.title}</h2>
            <p className="text-[#6a6a6a]">{data.text}</p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Work;
