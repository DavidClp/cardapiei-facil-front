import { HorarioAtendimentoSchema } from './../../horarios_atendimento/schemas/HorariosAtendimentoResponse';
import { ContatoSchema } from "@/services/contato/schemas/ContatoResponse";
import { LocalicaoSchema } from "@/services/localizacao/schemas/LocalizacaoResponse";
import { CategoriaSchema } from "@/services/produto/schemas/CategoriaResponse";
import { z } from "zod";

export const EstabelecimentoFullDetalheSchema = z.object({
    id: z.number(),
    nome: z.string(),
    descricao: z.string(),
    logo: z.string(),
    url: z.string(),
    usu_id: z.number(),

    //todos os objetos que vem carregado com ele no cardapio
    Categoria: CategoriaSchema,
    Contatos: ContatoSchema,
    Localizacaos: LocalicaoSchema,
    horario_atendimentos: HorarioAtendimentoSchema
})

export type EstabelecimentoFullDetalheResponse = z.infer<typeof EstabelecimentoFullDetalheSchema>;