import React, { useState } from 'react'
import { FormLogin } from '../../basicosComponents/Forms';
import { Navigate } from 'react-router-dom';
import axios from "axios"
import { useForm } from 'react-hook-form'
import { useMutation } from "react-query";
import useEstIdStore from '../../../stores/estIdStore';
import { urlApi } from '../../../constants/urlApi';
const url = urlApi

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { setEstId } = useEstIdStore();

    const [logou, setLogou] = useState(0); //GAMBIARRA, ARRUMAR

    const onSubmit = (data) => {
        mutate(data);
    }

    const { mutate, isSuccess } = useMutation((data) => {
        return axios.post(`${url}api/usuarios/login`, data)
            .then((response) => response.data);
    },
        {
            onSuccess: (responseData) => {
                const dados = responseData;
                //Remover = localStorage
                localStorage.setItem('token', dados.token);
                localStorage.setItem('est_id', dados.est_id);
                localStorage.setItem('est_url', dados.est_url);

                // e utilizar zustand:
                setEstId(dados.est_id);
                setLogou(1);
            }
        }
    );

    return (
        <section>
            {logou === 1 && <Navigate to="/admin/cardapio" />},
            <FormLogin
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                register={register}
                errors={errors}
            />
        </section>
    )
}

export default Login