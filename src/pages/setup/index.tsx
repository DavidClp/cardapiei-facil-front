import React, {useState} from "react";
import Header from "../../components/setupComponents/Header";
import { FormEstabelecimento } from "../../components/basicosComponents/FormsSetup";
import { Navigate } from "react-router-dom";

const Admin = () => {
  const [passoAtual, setPassoAtual] = useState(1);
  
  return (
    <section className="flex flex-col min-h-full bg-background">
      <Header />
      <div className="flex items-center justify-center px-4 mt-32">
        {passoAtual === 1 && (
          <FormEstabelecimento setPassoAtual={setPassoAtual} />
        )}
{/*             {passoAtual === 2 && (
        <FormLocalizacao
          setPassoAtual={setPassoAtual}
          handleVoltar={handleVoltar}
        />
      )}
      {passoAtual === 3 && (
        <FormContato
          setPassoAtual={setPassoAtual}
          handleVoltar={handleVoltar}
        />
      )}
      {passoAtual === 4 && (
        <FormHorario
          setPassoAtual={setPassoAtual}
          handleVoltar={handleVoltar}
        />
      )}

      {passoAtual === 5 && (
        <FormSenha
          setPassoAtual={setPassoAtual}
          handleVoltar={handleVoltar}
        />
      )} */}

      {passoAtual === 2 && <Navigate to="/login" />}
      </div>
    </section>
  );
};

export default Admin;
