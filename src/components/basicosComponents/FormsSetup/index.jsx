import React, { useState } from "react";
import "./forms.scss";
import {
  ButtonAvancar,
  ButtonAvancar2,
  ButtonVoltar,
  ButtonRemove,
  ButtonCancelar,
  ButtonEfeite,
} from "../../basicosComponents/Buttons/";
import { ButtonAdd } from "../../basicosComponents/Buttons/";

import { ImHome } from "react-icons/im";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import { AiFillClockCircle } from "react-icons/ai";
import { GiPadlock } from "react-icons/gi";

import { DivInput } from "../DivInput";
import { Label } from "../Label";
import { Input } from "../../../componentes/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "../../../componentes/card";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "react-query";
import { urlApi } from "../../../constants/urlApi";
const url = urlApi;

const FormEstabelecimento = ({ setPassoAtual }) => {
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const [logoSelecionada, setLogoSelecionada] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("nome", data.nome);
    formData.append("descricao", data.descricao);
    formData.append("logo", logoSelecionada);
    mutate(formData);
  };

  const { mutate } = useMutation(
    (formData) => {
      return axios
        .post(`${url}api/estabelecimentos`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => response.data);
    },
    {
      onSuccess: (responseData) => {
        const dados = responseData;
        localStorage.setItem("est_id", dados.id);
        setPassoAtual((passoAtual) => passoAtual + 1);
      },
    }
  );

  //pega a imagem selecionada
  const handleImagemChange = (e) => {
    const arquivoSelecionado = e.target.files[0];
    setLogoSelecionada(e.target.files[0]);
    if (arquivoSelecionado) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagemSelecionada(e.target.result);
      };

      reader.readAsDataURL(arquivoSelecionado);
    }
  };
  //retira a imagem selecionada
  const handleRemoverImagem = () => {
    setImagemSelecionada(null);
  };

  return (
    <Card
      /* w-full lg:w-[60%]  */
      className="
    mt-20 lg:mt-0"
    >
      <CardHeader>
        <CardTitle className="flex justify-center gap-2">
          <ImHome />
          Informações Básicas
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5 flex flex-col items-center justify-center gap-4"
        >
          <DivInput className="input">
            <Label htmlFor="nome">Nome do estabelecimento</Label>
            <Input
              type="text"
              name="nome"
              id="nome"
              placeholder="Lanchonete"
              className={`rounded py-1 px-2 w-full ${
                errors?.nome && "outline-rose-500"
              }`}
              {...register("nome", { required: true })}
            />
            {errors?.nome?.type === "required" && (
              <p className="outline-rose-500">Nome é requirido</p>
            )}
          </DivInput>

          <DivInput className="input">
            <Label htmlFor="descricao">Descrição do estabelecimento</Label>
            <textarea
              name="descricao"
              id="descricao"
              cols="50"
              rows="3"
              placeholder="Mostre o que seu estabelecimento tem de melhor aos seus clientes"
              className={`rounded-md p-2 w-full outline-primary border border-input `}
              //value={estabelecimentoFormData.descricao}
              {...register("descricao")}
            ></textarea>
          </DivInput>

          <div>
            {imagemSelecionada ? (
              <div>
                <img
                  src={imagemSelecionada}
                  alt="Imagem Selecionada"
                  className="w-40 h-36 mb-1 bg-background object-cover"
                />
              </div>
            ) : (
              <div>
                <label
                  className="w-40 h-36 bg-accent p-3 rounded inline-block cursor-pointer mb-1"
                  htmlFor="customFile"
                >
                  Clique Aqui para Adicionar uma imagem
                </label>
              </div>
            )}

            {imagemSelecionada ? (
              <label
                className="bg-accent p-1 rounded inline-block cursor-pointer z-50"
                onClick={handleRemoverImagem}
              >
                Remover
              </label>
            ) : (
              <>
                <label
                  className="bg-accent p-1 rounded inline-block cursor-pointer"
                  htmlFor="customFile"
                >
                  Adicionar
                </label>
                <input
                  type="file"
                  className="absolute opacity-0 cursor-pointer"
                  id="customFile"
                  name="file"
                  {...register("logo")}
                  onChange={handleImagemChange}
                />
              </>
            )}
          </div>
          <ButtonAvancar />
        </form>
      </CardContent>
    </Card>
  );
};

const FormLocalizacao = ({ setPassoAtual, handleVoltar }) => {
  const { register, handleSubmit, reset, getValues } = useForm();
  const onSubmit = (data) => {
    mutate(data);
  };

  const { mutate } = useMutation(
    (data) => {
      return axios
        .post(`${url}api/localizacao`, data, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => response.data);
    },
    {
      onSuccess: (responseData) => {
        /* const dados = responseData; */
        reset();
        setPassoAtual((passoAtual) => passoAtual + 1);
      },
    }
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-center gap-2">
          <FaLocationDot />
          Localização do estabelecimento
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5 flex flex-col items-center justify-center gap-4"
        >
          <DivInput>
            <Label htmlFor="cep">CEP</Label>
            <Input
              type="text"
              name="cep"
              id="cep"
              {...register("cep")}
              className="rounded-md p-2 w-full focus:outline-none text-sm"
            />
          </DivInput>

          <DivInput>
            <Label htmlFor="endereco">Endereço</Label>
            <Input
              type="text"
              name="endereco"
              id="endereco"
              {...register("endereco")}
              className="rounded-md p-2 w-full focus:outline-none text-sm"
            />
          </DivInput>

          <div className="grid grid-cols-3 gap-3 w-full">
            <DivInput className="col-span-2">
              <Label htmlFor="bairro">Bairro</Label>
              <Input
                type="text"
                name="bairro"
                id="bairro"
                {...register("bairro")}
                className="rounded-md p-2 w-full focus:outline-none text-sm"
              />
            </DivInput>

            <DivInput>
              <Label htmlFor="numero">Número</Label>
              <Input
                type="number"
                name="numero"
                id="numero"
                {...register("numero")}
                className="rounded-md p-2 w-full focus:outline-none text-sm"
              />
            </DivInput>
          </div>

          <DivInput>
            <Label htmlFor="cidade">Cidade</Label>
            <Input
              type="text"
              name="cidade"
              id="cidade"
              {...register("cidade")}
              className="rounded-md p-2 w-full focus:outline-none text-sm"
            />
          </DivInput>

          <div className="flex gap-2 w-full justify-between">
{/*             <ButtonCancelar onClick={handleVoltar}>Voltar</ButtonCancelar>
 */}            <ButtonEfeite texto={"Continuar"} />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const FormContato = ({ setPassoAtual, handleVoltar }) => {
  const { register, handleSubmit, reset, getValues } = useForm();
  const onSubmit = (data) => {
    mutate(data);
  };

  //pegar contatos ja registrados para mostrar
  const est_id = localStorage.getItem("est_id");
  const { data, isLoading, refetch } = useQuery(["contatos", est_id], () => {
    return axios
      .get(`${url}api/contatos/${est_id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => response.data);
  });

  const { mutate } = useMutation(
    (data) => {
      return axios
        .post(`${url}api/contatos`, data, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => response.data);
    },
    {
      onSuccess: (responseData) => {
        refetch(); //verificar
        /*   const dados = responseData; */
        reset();
      },
    }
  );

  const { mutate: deleteContato } = useMutation(
    (contatoId) =>
      axios.delete(`${url}api/contatos/${contatoId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error("Erro ao excluir o contato", error);
      },
    }
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle  className="flex justify-center gap-2">
        <BsFillTelephoneInboundFill />
        Meios de contato do estabelecimento
        </CardTitle>
      </CardHeader>
      <CardContent>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-2 py-4 flex flex-col items-center justify-center gap-4 w-full border-b-solid border-b-[1px] border-b-cinzaClaro"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-2 w-full">
          <select
            name="tipoContato"
            id="tipoContato"
            {...register("tipo")}
            className="rounded p-2 border w-40 text-sm"
          >
            <option value="">Escolha</option>
            <option value="telefone">Telefone</option>
            <option value="whatsapp">Whatsapp</option>
            <option value="email">E-mail</option>
          </select>
          <div className="flex justify-center items-center w-[90%] lg:w-[75%] gap-2 lg:px-4">
            <Input
              type="text"
              name="contato"
              id="contato"
              {...register("contato")}
            />
            <ButtonAdd />
          </div>
        </div>
      </form>
      </CardContent>

      <CardFooter>
      {isLoading === false &&
        data.map((contato) => (
          <div
            className="flex items-center flex-col justify-center px-6 py-1"
            key={contato.id}
          >
            <div className="rounded p-2 lg:w-[30%] text-center font-medium capitalize">
              <p>{contato.tipo}</p>
            </div>

            <div className="flex gap-2 w-full items-center">
              <div className="rounded p-2 bg-corTextSecundaria w-[90%] text-sm">
                <p>{contato.contato}</p>
              </div>
              <ButtonRemove onClick={() => deleteContato(contato.id)} />
            </div>
          </div>
        ))}
      <div className="flex justify-end p-4">
        {/*        <ButtonVoltar onClick={handleVoltar} /> */}
        <ButtonAvancar2 setPassoAtual={setPassoAtual} />
      </div>
      </CardFooter>
    </Card>
  );
};

const FormHorario = ({ setPassoAtual, handleVoltar }) => {
  const { register, handleSubmit, reset, getValues } = useForm();
  const onSubmit = (data) => {
    mutate(data);
  };

  //pegar horarios ja registrados para mostrar
  const est_id = localStorage.getItem("est_id");
  const { data, isLoading, refetch } = useQuery(["horarios", est_id], () => {
    return axios
      .get(`${url}api/horarios/${est_id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => response.data);
  });

  const { mutate } = useMutation(
    (data) => {
      return axios
        .post(`${url}api/horarios/`, data, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => response.data);
    },
    {
      onSuccess: (responseData) => {
        const dados = responseData;
        reset();
        refetch(); //verificar
      },
    }
  );

  const { mutate: deleteHorario } = useMutation(
    (HorarioId) =>
      axios.delete(`${url}api/horarios/${HorarioId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      }),
    {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error("Erro ao excluir o contato", error);
      },
    }
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle  className="flex justify-center gap-2">
        <AiFillClockCircle />
        Horários de atendimento
        </CardTitle>
      </CardHeader>

      <CardContent>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center py-2 lg:p-4 gap-4 w-full border-b-solid border-b-[1px] border-b-cinzaClaro"
      >
        <div className="flex flex-col items-center justify-center gap-3 w-full lg:flex-row">
          <select
            name="dia"
            id="dia"
            {...register("dia")}
            className="rounded p-2 text-sm w-52"
          >
            <option value=""></option>
            <option value="Todos os dias">Todos os dias</option>
            <option value="De segunda a sexta">De segunda a sexta</option>
            <option value="Aos fim de semana">Aos fim de semana</option>
            <option value="Domingo">Domingo</option>
            <option value="Segunda Feira">Segunda-feira</option>
            <option value="Terça Feira">Terça-feira</option>
            <option value="Terça Feira">Quarta-feira</option>
            <option value="Terça Feira">Quinta-feira</option>
            <option value="Terça Feira">Sexta-feira</option>
            <option value="Sabado">Sabado</option>
          </select>
          <div className="flex items-center justify-center gap-2">
            <Input
              type="time"
              name="hor_abre"
              id="hor_abre"
              {...register("hor_abre")}
              className="rounded p-1 bg-corTextSecundaria w-24"
            />
            <Input
              type="time"
              name="hor_fecha"
              id="hor_fecha"
              {...register("hor_fecha")}
              className="rounded p-1 bg-corTextSecundaria w-24"
            />
            <ButtonAdd />
          </div>
        </div>
      </form>
      </CardContent>
      <CardFooter>
      {isLoading === false &&
        data.map((horario) => (
          <div
            className="flex items-center flex-col justify-center py-2 px-6 gap-1 w-full"
            key={horario.id}
          >
            <div className="rounded p-2 bg-corTextSecundaria">
              <p>{horario.dia}</p>
            </div>

            <div className="flex items-center justify-center rounded p-2 gap-3 w-full">
              <div className="flex items-center justify-center p-2 gap-3 bg-corTextSecundaria rounded w-[90%]">
                <p>Das</p>
                <p className="font-medium">{horario.hor_abre}</p>
                <p>até</p>
                <p className="font-medium">{horario.hor_fecha}</p>
              </div>
              <ButtonRemove onClick={() => deleteHorario(horario.id)} />
            </div>
          </div>
        ))}

      <div className="flex gap-2 w-full justify-between p-4">
        <ButtonCancelar onClick={handleVoltar}>Voltar</ButtonCancelar>
        <ButtonAvancar2 setPassoAtual={setPassoAtual} />
      </div>
      </CardFooter>
    </Card>
  );
};

const FormSenha = ({ setPassoAtual, handleVoltar }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = (data) => {
    mutate(data);
  };

  const watchSenha = watch("senha");

  const { mutate } = useMutation(
    (data) => {
      return axios
        .put(`${url}api/usuarios/senha`, data, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((response) => response.data);
    },
    {
      onSuccess: (responseData) => {
        /*         const dados = responseData; */
        reset();
        setPassoAtual((passoAtual) => passoAtual + 1);
      },
    }
  );
  return (
    <Card className="w-full sm:w-[50%]">
      <CardHeader>
        <CardTitle  className="flex justify-center gap-2">
        <GiPadlock />
       Segurança
        </CardTitle>
      </CardHeader>

      <CardContent>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center py-2 lg:p-4 gap-4 w-full"
      >
        <DivInput className="input">
          <Label htmlFor="senha">Senha</Label>
          <Input
            type="password"
            name="senha"
            id="senha"
            placeholder="********"
            className={`rounded py-1 px-2 w-full ${
              errors?.senha && "outline-rose-500"
            }`}
            {...register("senha", { required: true, minLength: 8 })}
          />
          {errors?.senha?.type === "required" && (
            <p className="text-rose-500">senha é requerido</p>
          )}
          {errors?.senha?.type === "minLength" && (
            <p className="text-rose-500">
              Senha precisa no minimo 8 caracteres
            </p>
          )}
        </DivInput>

        <DivInput className="input">
          <Label htmlFor="confirmaSenha">Confirme sua senha</Label>
          <Input
            type="password"
            name="confirmaSenha"
            id="confirmaSenha"
            placeholder="********"
            className={`rounded py-1 px-2 w-full ${
              errors?.confirmaSenha && "outline-rose-500"
            }`}
            {...register("confirmaSenha", {
              required: true,
              validate: (value) => value === watchSenha,
            })}
          />
          {errors?.confirmaSenha?.type === "required" && (
            <p className="text-rose-500">Senha é requerido</p>
          )}
          {errors?.confirmaSenha?.type === "validate" && (
            <p className="text-rose-500">Senhas não estao iguais</p>
          )}
        </DivInput>

        <div className="flex gap-2 w-full justify-between">
          <ButtonCancelar onClick={handleVoltar}>Voltar</ButtonCancelar>
          <ButtonEfeite texto={"Continuar"} />
        </div>
      </form>
      </CardContent>
    </Card>
  );
};

export {
  FormEstabelecimento,
  FormLocalizacao,
  FormContato,
  FormHorario,
  FormSenha,
};
