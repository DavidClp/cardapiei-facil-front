import React from 'react'
import './main.scss';
import { FormCategoria } from '../../basicosComponents/FormsAdminCardapio';
import { CardProduto } from '../../basicosComponents/CardAdminCardapio';

import axios from "axios"
import { useForm } from 'react-hook-form'
import { useQuery, useMutation } from "react-query";
import { urlApi } from '../../../constants/urlApi';
const est_id = localStorage.getItem('est_id');
const url = urlApi

const Main = () => {

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data)
    mutate(data);
  }

  //pegar categorias ja registrados para mostrar
  const { data, isLoading, refetch } = useQuery(["categorias", est_id], () => {
    return axios.get(`${url}api/categorias/${est_id}`, {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  })

  const { mutate: deleteCategoria } = useMutation(
    (categoriaId) =>
      axios.delete(`${url}api/categorias/${categoriaId}`, {
        headers: {
          'token': localStorage.getItem('token'),
        },
      }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error('Erro ao excluir o contato', error);
      },
    }
  );

  const { mutate } = useMutation((data) => {
    return axios.post(`${url}api/categorias`, data, {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  },
    {
      onSuccess: (responseData) => {
        refetch();
        //const dados = responseData;
        reset();
      }
    }
  );


  return (
    <section className='flex flex-col gap-6 lg:flex-row px-3 lg:px-11 py-6 bg-bgPrimary'>
      <section className="flex items-center justify-center w-full mt-20 lg-mt-0 lg:w-[40vw] drop-shadow-md">
        <FormCategoria
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          deleteCategoria={deleteCategoria}
          isLoading={isLoading}
          data={data}
          refetch={refetch}
        />
      </section>

      <section className="flex items-center justify-center w-full lg:w-[60vw] drop-shadow-md">
        {data?.map((categoria) => (
          <CardProduto categoria={categoria} refetch={refetch}/>
        ))}
        {/* <FormProduto/> */}
      </section>
    </section>
  )
}

export default Main