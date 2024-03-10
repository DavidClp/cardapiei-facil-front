import { ProdutoListSchema } from './ProdutoListResponse';
import { z } from "zod";

export const CategoriaDetalheSchema = z.object({
    id: z.number(),
    nome: z.string(),
    Produtos:ProdutoListSchema.array() 
})

export type CategoriaDetalheResponse = z.infer<typeof CategoriaDetalheSchema>;