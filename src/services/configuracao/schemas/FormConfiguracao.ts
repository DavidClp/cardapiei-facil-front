import { z } from "zod";

export const FormConfiguracaoSchema = z.object({
    2: z.number(),
    4: z.string().transform((val) => parseInt(val)),
})

export type FormConfiguracao = z.infer<typeof FormConfiguracaoSchema>;