import {create} from "zustand";

const useEstIdStore = create((set) => ({
    estIdStore: null,
    setEstId: (newId) => set({ estIdStore: newId }),
}));

export default useEstIdStore;
