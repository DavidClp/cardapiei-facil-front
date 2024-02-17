import React, { useState } from 'react';
import './main.scss';
import { Navigate } from 'react-router-dom';
import { FormEstabelecimento, FormLocalizacao, FormContato, FormHorario, FormSenha } from '../../basicosComponents/FormsSetup';

const Main = () => {
  const [passoAtual, setPassoAtual] = useState(1);

  const handleVoltar = () => {
    if (passoAtual > 1) {
      setPassoAtual((passoAnterior) => passoAnterior - 1);
    }
  };

  return (
    <section className='flex items-center justify-center bg-background h-[93vh] px-4'>
      {passoAtual === 1 && (
        <FormEstabelecimento
          setPassoAtual={setPassoAtual}
        />
      )}
      {passoAtual === 2 && (
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
      )}

      {passoAtual === 6 && <Navigate to="/login" />}
    </section>
  );
};

export default Main;
