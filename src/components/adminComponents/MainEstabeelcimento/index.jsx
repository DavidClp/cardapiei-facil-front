import React from 'react'
import { FormEstabelecimento} from '../../basicosComponents/Forms';
import { Navigate } from 'react-router-dom';
import { FormLocalizacao } from '../../basicosComponents/Forms/FormLocalizacao';
import { FormContato } from '../../basicosComponents/Forms/FormContatos';
import { FormHorario } from '../../basicosComponents/Forms/FormHorario';


const Main = () => {
  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/" />;
  }
  return (
    <div className='flex flex-col items-center justify-center w-full py-4 px-2 bg-background gap-6 lg:gap-'>
      <FormEstabelecimento/>
      <FormLocalizacao/>
      <FormContato/>
      <FormHorario/>
    </div>
  )
}

export default Main