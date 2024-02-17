const Root = ({ children }) => {
  return <div className="bg-white flex flex-col items-center gap-4 justify-center rounded-lg shadow-md sm:px-10 h-auto py-8">{children}</div>;
};

const Title = ({ children }) => {
  return <h3 className="font-medium text-2xl">{children}</h3>;
};

const Icon = ({ children }) => {
  return <div className="my-2 h-auto">{children}</div>;
};

const Preco = ({ children }) => {
  return <p className="text-xl">{children}</p>;
};

const Observacao = ({ children }) => {
  return <p className="text-center w-72 grow">{children}</p>;
};

export const CardPlano = { Root, Title, Icon, Preco, Observacao };
