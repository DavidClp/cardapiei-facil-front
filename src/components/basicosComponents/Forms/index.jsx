import React from 'react'
import './forms.scss';
import { ButtonLogin, ButtonCadastrar, ButtonForm, ButtonRemove } from '../../basicosComponents/Buttons/';
import { ButtonAdd } from '../../basicosComponents/Buttons/';

import { ImHome } from 'react-icons/im';
import { FaLocationDot } from 'react-icons/fa6';
import { BsFillTelephoneInboundFill } from 'react-icons/bs';
import { AiFillClockCircle } from 'react-icons/ai';

import axios from "axios"
import { useForm } from 'react-hook-form'
import { useQuery, useMutation } from "react-query";
import validator from 'validator';
import { urlApi } from '../../../constants/urlApi';
const est_id = localStorage.getItem('est_id');
const url = urlApi

const FormEstabelecimento = () => {
 /*  const { estIdStore } = useEstIdStore(); */
  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm();
  //pegar dados ja registrados para mostrar
  const { data, isLoading, refetch } = useQuery(["estabelecimento", est_id], () => {
    return axios.get(`${url}api/estabelecimentos/geral/${est_id}`, {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  })

  const onSubmit = (dataForm) => {
    const formData = new FormData();
    formData.append('nome', dataForm.nome);
    formData.append('descricao', dataForm.descricao);
    formData.append('logo', dataForm.logo[0]);
    mutate(formData);
  }
  const { mutate } = useMutation((formData) => {
    return axios.put(`${url}api/estabelecimentos/geral/${est_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  },
    {
      onSuccess: (responseData) => {
        window.alert("sucesso")
        const dados = responseData;
      }
    }
  );

  return (
    <div className="formContainer">
      <div className="titulo">
        <ImHome />
        <h3>Informações básicas</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="input">
          <label htmlFor="nome">Nome do estabelecimento</label>
          <input
            type="text"
            name="nome"
            id="nome"
            placeholder="Lanchonete"
            className={errors?.nome && "inputError"}
            defaultValue={data?.nome || ""}
            {...register("nome", { required: true })}
          />
          {errors?.nome?.type === 'required' && <p className='errorMessage'>Nome é requirido</p>}
        </div>

        <div className="input">
          <label htmlFor="descricao">Descrição do estabelecimento</label>
          <textarea
            name="descricao"
            id="descricao"
            cols="50"
            rows="3"
            placeholder="Mostre o que seu estabelecimento tem de melhor aos seus clientes"
            defaultValue={data?.descricao || ""}
            {...register("descricao")}
          ></textarea>
        </div>

        <div className="custom-file">
          <label className="custom-file-label" htmlFor="customFile">
            Escolha um logotipo
          </label>
          <input type="file" className="custom-file-input"
            id="customFile"
            name="file"
            {...register("logo")}
          />
        </div>

        <ButtonForm />
      </form>
    </div>
  );
};

const FormLocalizacao = () => {
  const { register, handleSubmit, reset, getValues } = useForm();
  const onSubmit = (dataLocalizacao) => {
    mutate(dataLocalizacao);
  }

  //pegar dados ja registrados para mostrar
  const { data, isLoading, refetch } = useQuery(["localizacao", est_id], () => {
    return axios.get(`${url}api/localizacao/${est_id}`, {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  })

  const { mutate } = useMutation((dataLocalizacao) => {
    return axios.put(`${url}api/localizacao/${est_id}`, dataLocalizacao, {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  },
    {
      onSuccess: (responseData) => {
        const dados = responseData;
      }
    }
  );
  return (
    <div className="formContainer">
      <div className="titulo">
        <FaLocationDot />
        <h3>Localização do estabelecimento</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form">

        <div className="input">
          <label htmlFor="cep">CEP</label>
          <input type="text" name="cep" id="cep"
            {...register("cep")}
            defaultValue={data?.cep || ""}
          />
        </div>

        <div className="input">
          <label htmlFor="endereco">Endereço</label>
          <input type="text" name="endereco" id="endereco"
            defaultValue={data?.endereco || ""}
            {...register("endereco")}
          />
        </div>

        <div className="input">
          <label htmlFor="numero">Número</label>
          <input type="number" name="numero" id="numero"
            {...register("numero")}
            defaultValue={data?.numero || ""}
          />
        </div>

        <div className="input">
          <label htmlFor="bairro">Bairro</label>
          <input type="text" name="bairro" id="bairro"
            {...register("bairro")}
            defaultValue={data?.bairro || ""}
          />
        </div>

        <div className="input">
          <label htmlFor="cidade">Cidade</label>
          <input type="text" name="cidade" id="cidade"
            {...register("cidade")}
            defaultValue={data?.cidade || ""}
          />
        </div>
        <ButtonForm />
      </form>
    </div>
  )
}

const FormContato = ({ setPassoAtual, handleVoltar }) => {
  const { register, handleSubmit, reset, getValues } = useForm();
  const onSubmit = (data) => {
    mutate(data);
  }

  //pegar contatos ja registrados para mostrar
  const { data, isLoading, refetch } = useQuery(["contatos", est_id], () => {
    return axios.get(`${url}api/contatos/${est_id}`, {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  })

  const { mutate: deleteContato } = useMutation(
    (contatoId) =>
      axios.delete(`${url}contatos/${contatoId}`, {
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
    return axios.post(`${url}contatos`, data, {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  },
    {
      onSuccess: (responseData) => {
        refetch();//verificar
        const dados = responseData;
        reset();
      }
    }
  );
  return (
    <div className="formContainer">
      <div className="titulo">
        <BsFillTelephoneInboundFill />
        <h3>Meios de contato do estabelecimento</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="inputSelect">
          <select name="tipoContato" id="tipoContato" {...register("tipo")}>
            <option value="">Escolha</option>
            <option value="telefone">Telefone</option>
            <option value="whatsapp">Whatsapp</option>
            <option value="email">E-mail</option>
          </select>
          <input type="text" name="contato" id="contato" {...register("contato")} />
          <ButtonAdd />
        </div>
      </form>
      {isLoading === false &&
        data.map((contato) => (
          <div className="getContatos" key={contato.id}>
            <div className="tipo">
              <p>{contato.tipo}</p>
            </div>

            <div className="contato">
              <p>{contato.contato}</p>
            </div>
            <ButtonRemove onClick={() => deleteContato(contato.id)}/>
          </div>
        ))
      }
    </div>
  )
}

const FormHorario = () => {
  const { register, handleSubmit, reset, getValues } = useForm();
  const onSubmit = (data) => {
    mutate(data);
  }

  //pegar horarios ja registrados para mostrar
  const { data, isLoading, refetch } = useQuery(["horarios", est_id], () => {
    return axios.get(`${url}api/horarios/${est_id}`, {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  })

  const { mutate } = useMutation((data) => {
    return axios.post(`${url}horarios/`, data, {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  },
    {
      onSuccess: (responseData) => {
        const dados = responseData;
        reset();
        refetch();//verificar
      }
    }
  );

  const { mutate: deleteHorario } = useMutation(
    (HorarioId) =>
      axios.delete(`${url}api/horarios/${HorarioId}`, {
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
  return (
    <div className="formContainer">
      <div className="titulo">
        <AiFillClockCircle />
        <h3>Horários de atendimento</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="inputSelect">
          <select name="dia" id="dia" {...register("dia")}>
            <option value=""></option>
            <option value="Sabado">Sabado</option>
            <option value="Domingo">Domingo</option>
            <option value="Segunda Feira">Segunda Feira</option>
            <option value="Terça Feira">Terça Feira</option>
          </select>
          <input type="text" name="hor_abre" id="hor_abre" {...register("hor_abre")} />
          <input type="text" name="hor_fecha" id="hor_fecha" {...register("hor_fecha")} />
          <ButtonAdd />
        </div>
      </form>
      {isLoading === false &&
        data.map((horario) => (
          <div className="getContatos" key={horario.id}>
            <div className="tipo">
              <p>{horario.dia}</p>
            </div>

            <div className="contato">
              <p>{horario.hor_abre}</p>
              <p>{horario.hor_fecha}</p>
            </div>

            <ButtonRemove onClick={() => deleteHorario(horario.id)}/>
          </div>
        ))
      }
    </div>
  )
}

const FormCadastro = ({ handleSubmit, onSubmit, register, errors }) => {
  return (
    <div className="formContainer formCadastro">
      <div className="titulo">
        <FaLocationDot />
        <h3>Cadastro</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form">

        <div className="input">
          <label htmlFor="nome">Seu nome</label>
          <input type="text" name="nome"
            id="nome"
            className={errors?.nome && "inputError"}
            {...register("nome", { required: true })}
          />
          {errors?.nome?.type === 'required' && <p className='errorMessage'>Nome é requirido</p>}
        </div>

        <div className="input">
          <label htmlFor="email">E-mail</label>
          <input type="text" name="email"
            id="email"
            className={errors?.email && "inputError"}
            {...register("email", {
              required: true,
              validate: (value) => validator.isEmail(value)
            })}
          />
          {errors?.email?.type === 'required' && <p className='errorMessage'>E-mail é requirido</p>}
          {errors?.email?.type === 'validate' && <p className='errorMessage'>E-mail Invalido</p>}
        </div>

        <ButtonCadastrar />
      </form>
    </div>
  )
}

const FormLogin = ({ handleSubmit, onSubmit, register, errors }) => {
  return (
    <div className="formContainer formCadastro">
      <div className="titulo">
        <FaLocationDot />
        <h3>Login</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="input">
          <label htmlFor="email">E-mail</label>
          <input type="text" name="email"
            id="email"
            className={errors?.email && "inputError"}
            {...register("email", {
              required: true,
              validate: (value) => validator.isEmail(value)
            })}
          />
          {errors?.email?.type === 'required' && <p className='errorMessage'>E-mail é requirido</p>}
          {errors?.email?.type === 'validate' && <p className='errorMessage'>E-mail Invalido</p>}
        </div>

        <div className="input">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            name="senha"
            id="senha"
            placeholder="********"
            className={errors?.senha && "inputError"}
            {...register("senha", { required: true })}
          />
          {errors?.senha?.type === 'required' && <p className='errorMessage'>senha é requirido</p>}
        </div>
        <ButtonLogin />
      </form>
    </div>
  )
}

export {
  FormEstabelecimento,
  FormLocalizacao,
  FormContato,
  FormHorario,
  FormCadastro,
  FormLogin
}   