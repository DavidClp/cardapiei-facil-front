import React, { useState } from 'react'
import './forms.scss';
import { ButtonAvancar, ButtonAvancar2, ButtonForm, ButtonVoltar, ButtonRemove } from '../../basicosComponents/Buttons/';
import { ButtonAdd } from '../../basicosComponents/Buttons/';

import { ImHome } from 'react-icons/im';
import { FaLocationDot } from 'react-icons/fa6';
import { BsFillTelephoneInboundFill } from 'react-icons/bs';
import { AiFillClockCircle } from 'react-icons/ai';
import { GiPadlock } from 'react-icons/gi';

import axios from "axios"
import { useForm } from 'react-hook-form'
import { useQuery, useMutation } from "react-query";
import { urlApi } from "../../../constants/urlApi";
const url = urlApi;
const FormEstabelecimento = ({ setPassoAtual }) => {
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('nome', data.nome);
    formData.append('descricao', data.descricao);
    formData.append('logo', data.logo[0]);
    console.log(data)
    mutate(formData);
  }

  const { mutate } = useMutation((formData) => {
    return axios.post(`${url}api/estabelecimentos`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  },
    {
      onSuccess: (responseData) => {
        const dados = responseData;
        localStorage.setItem('est_id', dados.id);
        setPassoAtual((passoAtual) => passoAtual + 1);
      }
    }
  );

  const handleImagemChange = (e) => {
    const arquivoSelecionado = e.target.files[0];
    if (arquivoSelecionado) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagemSelecionada(e.target.result);
      };

      reader.readAsDataURL(arquivoSelecionado);
    }
  };

  const handleRemoverImagem = () => {
    setImagemSelecionada(null);
  };
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
            //value={estabelecimentoFormData.descricao}
            {...register("descricao")}
          ></textarea>
        </div>

        <div className="custom-file">
          {imagemSelecionada ? (
            <div>
              <img src={imagemSelecionada} alt="Imagem Selecionada" />
            </div>
          ) : (
            <div>
              <label className="FileContainer" htmlFor="customFile">
                Clique Aqui para Adicionar uma imagem
              </label>

            </div>)}
          {imagemSelecionada ? (
            <label className="customFileLabel" onClick={handleRemoverImagem}>
              Remover
            </label>
          ) : (
            <label className="customFileLabel" htmlFor="customFile">
              Adicionar
            </label>
          )}
        </div>
        <input type="file" className="custom-file-input"
          id="customFile"
          name="file"
          {...register("logo")}
          onChange={handleImagemChange}
        />
        <ButtonAvancar />
      </form>
    </div>
  );
};

const FormLocalizacao = ({ setPassoAtual, handleVoltar }) => {
  const { register, handleSubmit, reset, getValues } = useForm();
  const onSubmit = (data) => {
    mutate(data);
  }

  const { mutate } = useMutation((data) => {
    return axios.post(`${url}api/localizacao`, data, {
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
        setPassoAtual((passoAtual) => passoAtual + 1);
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
          //value={localizacaoFormData.cep} 
          />
        </div>

        <div className="input">
          <label htmlFor="endereco">Endereço</label>
          <input type="text" name="endereco" id="endereco"
            {...register("endereco")}
          //value={localizacaoFormData.endereco}
          />
        </div>

        <div className="input">
          <label htmlFor="numero">Número</label>
          <input type="number" name="numero" id="numero"
            {...register("numero")}
          //value={localizacaoFormData.numero} 
          />
        </div>

        <div className="input">
          <label htmlFor="bairro">Bairro</label>
          <input type="text" name="bairro" id="bairro"
            {...register("bairro")}
          //value={localizacaoFormData.bairro} 
          />
        </div>

        <div className="input">
          <label htmlFor="cidade">Cidade</label>
          <input type="text" name="cidade" id="cidade"
            {...register("cidade")}
          //value={localizacaoFormData.cidade} 
          />
        </div>

        <div className="buttons">
          <ButtonVoltar onClick={handleVoltar} />
          <ButtonAvancar />
        </div>

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
  const est_id = localStorage.getItem('est_id');
  const { data, isLoading, refetch } = useQuery(["contatos", est_id], () => {
    return axios.get(`${url}api/contatos/${est_id}`, {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  })

  const { mutate } = useMutation((data) => {
    return axios.post(`${url}api/contatos`, data, {
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

  const { mutate: deleteContato } = useMutation(
    (contatoId) =>
      axios.delete(`${url}api/contatos/${contatoId}`, {
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

            <ButtonRemove onClick={() => deleteContato(contato.id)} />
          </div>
        ))
      }
      <div className="buttons">
        <ButtonVoltar onClick={handleVoltar} />
        <ButtonAvancar2 setPassoAtual={setPassoAtual} />
      </div>
    </div>
  )
}

const FormHorario = ({ setPassoAtual, handleVoltar }) => {
  const { register, handleSubmit, reset, getValues } = useForm();
  const onSubmit = (data) => {
    mutate(data);
  }

  //pegar horarios ja registrados para mostrar
  const est_id = localStorage.getItem('est_id');
  const { data, isLoading, refetch } = useQuery(["horarios", est_id], () => {
    return axios.get(`${url}api/horarios/${est_id}`, {
      headers: {
        'token': localStorage.getItem('token'),
      },
    })
      .then((response) => response.data);
  })

  const { mutate } = useMutation((data) => {
    return axios.post(`${url}api/horarios/`, data, {
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

            <ButtonRemove onClick={() => deleteHorario(horario.id)} />
          </div>
        ))
      }
      <div className="buttons">
        <ButtonVoltar onClick={handleVoltar} />
        <ButtonAvancar2 setPassoAtual={setPassoAtual} />
      </div>
    </div>
  )
}

const FormSenha = ({ setPassoAtual, handleVoltar }) => {
  const { register, handleSubmit, reset, getValues, formState: { errors }, watch } = useForm();
  const onSubmit = (data) => {
    mutate(data);
  }

  const watchSenha = watch("senha");

  const { mutate } = useMutation((data) => {
    return axios.put(`${url}api/usuarios/senha`, data, {
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
        setPassoAtual((passoAtual) => passoAtual + 1);
      }
    }
  );
  return (
    <div className="formContainer">
      <div className="titulo">
        <GiPadlock />
        <h3>Segurança</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="input">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            name="senha"
            id="senha"
            placeholder="********"
            className={errors?.senha && "inputError"}
            {...register("senha", { required: true, minLength: 8 })}
          />
          {errors?.senha?.type === 'required' && <p className='errorMessage'>senha é requirido</p>}
          {errors?.senha?.type === 'minLength' && <p className='errorMessage'>Senha precisa no minimo 8 caracteres</p>}
        </div>

        <div className="input">
          <label htmlFor="confirmaSenha">Confirme sua senha</label>
          <input
            type="password"
            name="confirmaSenha"
            id="confirmaSenha"
            placeholder="********"
            className={errors?.confirmaSenha && "inputError"}
            {...register("confirmaSenha", { required: true, validate: (value) => value === watchSenha })}
          />
          {errors?.confirmaSenha?.type === 'required' && <p className='errorMessage'>Senha é requirido</p>}
          {errors?.confirmaSenha?.type === 'validate' && <p className='errorMessage'>Senhas não estao iguais</p>}
        </div>

        <ButtonAvancar />
      </form>
    </div>
  );
};



export {
  FormEstabelecimento,
  FormLocalizacao,
  FormContato,
  FormHorario,
  FormSenha
}      