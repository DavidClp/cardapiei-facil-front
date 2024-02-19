import { Link } from "react-router-dom";

export function ChamadaAcao() {
  return (
    <section className="mt-20 py-10 flex flex-col items-center gap-6 lg:flex-row lg:px-32 lg:justify-center">
      <Link to="/cadastro">
        <button class="custom-btn btn-11">
          Crie seu Cardápio<div class="dot"></div>
        </button>
      </Link>

      <div className="flex flex-col items-center ">
        <h2 className="font-bold text-center text-xl lg:text-3xl max-w-xl">CRIE VOCÊ MESMO SEU CARDÁPIO DIGITAL EM POUCOS MINUTOS!</h2>
        <p className="text-lg max-w-xl">
          Comece hoje mesmo a encantar seus clientes e a facilitar seu dia a dia
          com um cardápio digital atrativo. <span className="font-medium">A primeira semana é grátis!</span> 
        </p>
      </div>
    </section>
  );
}
