import { ConfiguracaoEstabelecimentoResponse } from "./../../services/configuracao/schemas/ConfiguracaoEstabelecimentoResponse";
import { StateCreator } from "zustand";

export interface ConfiguracaoStore {
  configuracoes: ConfiguracaoEstabelecimentoResponse[];

  definirConfiguracoes: (
    cfgList: ConfiguracaoEstabelecimentoResponse[]
  ) => void;
  getConfiguracaoByCfgtId: (
    cfgtId: number
  ) => ConfiguracaoEstabelecimentoResponse;
}

export const createConfiguracaoSlice: StateCreator<
  ConfiguracaoStore,
  [],
  [],
  ConfiguracaoStore
> = (set, get) => ({
  configuracoes: [],

  definirConfiguracoes: (cfgList) => set({ configuracoes: cfgList }),

  getConfiguracaoByCfgtId: (cfgtId) => {
    const state = get();
    return state.configuracoes.find((cfg) => cfg.cfgt_id === cfgtId);
  },
});
