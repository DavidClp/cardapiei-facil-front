import { ProdutoListSchema } from './ProdutoListResponse';
import { z } from "zod";

export const CategoriaListSchema = z.object({
    id: z.number(),
    nome: z.string(),
    Produtos:ProdutoListSchema.array() 
}).array()

export type CategoriaListResponse = z.infer<typeof CategoriaListSchema>;