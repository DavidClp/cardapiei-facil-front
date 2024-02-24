import { z } from "zod";

export const ProdutoDetalheSchema = z.object({
    id: z.number(),
    nome: z.string(),
    cat_id: z.number(),
    descricao: z.string(),
    valor: z.string(),
    imagem: z.string()
})

export type ProdutoDetalheResponse = z.infer<typeof ProdutoDetalheSchema>;