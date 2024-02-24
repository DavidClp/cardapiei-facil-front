import { z } from "zod";

export const LocalicaoSchema = z.object({
    id: z.number(),
    cep: z.string(),
    endereco: z.string(),
    bairro: z.string(),
    cidade: z.string(),
    numero: z.string().transform(Number),
}).array()

export type LocalicaoResponse = z.infer<typeof LocalicaoSchema>;