import React from "react";
import { BiSolidStar, BiStar } from "react-icons/bi";
import { BsStarHalf } from "react-icons/bs";

const Testimonial = () => {
  const feedbacksFake = [
    {
      texto: "Muito prático para compartilhar meus produtos no WhatsApp",
      estrelas: 4,
    },
    {
      texto: "O Cardápiei é uma revolução para meu restaurante. A facilidade em criar um cardápio visualmente atraente e compartilhá-lo com clientes via QR code é essencial para manter a sofisticação do meu negócio.",
      estrelas: 5,
    },
    {
      texto: "É a vibe perfeita para minha lanchonete. Deixo o QR Code na messa para os clientes irem escolhendo sem precisarem pedir o menu. É a pegada moderna que meus clientes adoram!",
      estrelas: 5,
    },
    {
      texto: "boa ferramenta de trabalho e vou assinar, é muito pratico",
      estrelas: 4.5,
    },
    {
      texto: "Personalizei meu cardápio com imagens irresistíveis e compartilhar no WhatsApp é como convidar meus clientes para desfrutar de um momento delicioso. Simples e eficaz!",
      estrelas: 5,
    },
    {
      texto: "Estava cansado de riscar meu cardápio toda vez que mudava o preço de algo, então para mim vale cada centavo o Cardápiei ",
      estrelas: 4.5,
    },
  ];

  return (
    <section className="work-section-wrapper">
      <div className="work-section-top">
        <h1 className="primary-heading">Mais que um serviço online... Uma Parceria! </h1>
        <p className="primary-text">
        Para que dizer mais, se nossos amigos clientes podem dizer pela gente 😍
        </p>
      </div>

      <div className="grid lg:grid-cols-3 items-center justify-center">
        {feedbacksFake.map((feedback, index) => (
          <div className="testimonial-section-bottom" key={index}>
            <p>{feedback.texto}</p>
            <div className="testimonials-stars-container">
              {feedback.estrelas === 4 && (
                <>
                  <BiSolidStar />
                  <BiSolidStar />
                  <BiSolidStar />
                  <BiSolidStar />
                  <BiStar />
                </>
              )}
              {feedback.estrelas === 4.5 && (
                <>
                  <BiSolidStar />
                  <BiSolidStar />
                  <BiSolidStar />
                  <BiSolidStar />
                  <BsStarHalf />
                </>
              )}
              {feedback.estrelas === 5 && (
                <>
                  <BiSolidStar />
                  <BiSolidStar />
                  <BiSolidStar />
                  <BiSolidStar />
                  <BiSolidStar />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
