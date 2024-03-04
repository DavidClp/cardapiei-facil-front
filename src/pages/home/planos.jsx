import Header from "./components/Header";
import HeaderMobile from "./components/HeaderMobile";
import pizza from "./Assets/pizza.png";
import lanche from "./Assets/lanche.png";
import carne from "./Assets/carne.svg";
import { CardPlano } from "./components/card-plano";
import { ButtonHomePage } from "../../components/basicosComponents/Buttons";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const Planos = () => {
  return (
    <>
      <HeaderMobile />
      <Header />
      <section className="bg-background flex flex-col py-14 px-5 sm:px-10 h-full">
      <a id="top"></a>
        <div className="text-center my-16 mt-20 lg:mt-0">
          <h2 className="sm:text-4xl text-3xl font-bold">
            Garanta o seu cardápio sempre nas mãos de seus clientes!
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          <CardPlano.Root>
            <CardPlano.Title>Plano Mensal</CardPlano.Title>
            <CardPlano.Icon>
              <img src={lanche} alt="Lanche" />
            </CardPlano.Icon>
             <CardPlano.Preco>R$ <span className="font-bold text-3xl">39,99</span> /Mês</CardPlano.Preco>
            
            <Link to="https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c9380848bdf5283018be34f60f701cd" target="_blank">
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
            <CardPlano.Title>Plano Trimestral</CardPlano.Title>
            <CardPlano.Icon>
              <img src={pizza} alt="pizza" />
            </CardPlano.Icon>
             <CardPlano.Preco>R$ <span className="font-bold text-3xl">89,99</span> /Trimestre</CardPlano.Preco>
            
            <Link to="https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c9380848df5820d018e0721202910d2" target="_blank">
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
              <img src={carne} alt="carne" className="w-[100px]"/>
            </CardPlano.Icon>
            <CardPlano.Preco>R$ <span className="font-bold text-3xl">269,99</span> /Ano</CardPlano.Preco>
            <Link to="https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c9380848de741c1018e00e68b9416f8" target="_blank">
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
