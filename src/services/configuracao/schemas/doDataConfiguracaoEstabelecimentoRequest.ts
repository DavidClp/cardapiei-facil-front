import { z } from "zod";

export const doDataConfiguracaoEstabelecimentoSchema = z.object({
  estId: z.number(),
});

export type doDataConfiguracaoEstabelecimentoRequest = z.infer<
  typeof doDataConfiguracaoEstabelecimentoSchema
>;
