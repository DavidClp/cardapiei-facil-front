import {create} from "zustand";

const useEstStore = create((set) => ({
    estIdStore: null,
    estUrl: null,

    setEstId: (newId) => set({ estIdStore: newId }),
    definirUrl: (estUrl) => set({ estUrl: estUrl }),
}));


export default useEstStore;
