import { ProdutoListSchema } from './ProdutoListResponse';
import { z } from "zod";

export const CategoriaSchema = z.object({
    id: z.number(),
    nome: z.string(),
    Produtos:ProdutoListSchema.array() 
}).array()

export type CategoriaResponse = z.infer<typeof CategoriaSchema>;