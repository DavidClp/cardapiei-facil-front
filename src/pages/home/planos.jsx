import Header from "./components/Header";
import HeaderMobile from "./components/HeaderMobile";
import pizza from "./Assets/pizza.png";
import lanche from "./Assets/lanche.png";
import { CardPlano } from "./components/card-plano";
import { ButtonHomePage } from "../../components/basicosComponents/Buttons";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const Planos = () => {
  return (
    <>
      <HeaderMobile />
      <Header />
      <section className="bg-background flex flex-col py-14 px-5 sm:px-10">
      <a id="top"></a>
        <div className="text-center my-16 mt-20 lg:mt-0">
          <h2 className="sm:text-4xl text-3xl font-bold">
            Garanta o seu cardápio sempre nas mãos de seus clientes!
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 justify-center">
          <CardPlano.Root>
            <CardPlano.Title>Plano Mensal</CardPlano.Title>
            <CardPlano.Icon>
              <img src={lanche} alt="Lanche" />
            </CardPlano.Icon>
             <CardPlano.Preco>R$ <span className="font-bold text-3xl">29,99</span> /Mês</CardPlano.Preco>
            
            <Link to="https://pag.ae/7ZZiJ12Vm" target="_blank">
            <ButtonHomePage>
              Assinar
              <MdKeyboardArrowRight className="text-3xl" />
            </ButtonHomePage>
            </Link>
            <CardPlano.Observacao>
              No boleto ou cartão de crédito.
            </CardPlano.Observacao>
          </CardPlano.Root>

          <CardPlano.Root>
            <CardPlano.Title>Plano Anual</CardPlano.Title>
            <CardPlano.Icon>
              <img src={pizza} alt="Lanche" />
            </CardPlano.Icon>
            <CardPlano.Preco>R$ <span className="font-bold text-3xl">269,99</span> /Ano</CardPlano.Preco>
            <Link to="https://pag.ae/7ZZiHcdQq" target="_blank">
            <ButtonHomePage>
              Assinar
              <MdKeyboardArrowRight className="text-3xl" />
            </ButtonHomePage>
            </Link>
            <CardPlano.Observacao>
              Ganhe 3 meses com o plano anual pagando no boleto ou parcelado cartão.
            </CardPlano.Observacao>
          </CardPlano.Root>
        </div>
      </section>
    </>
  );
};

export default Planos;
