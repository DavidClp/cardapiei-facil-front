import { create } from "zustand";
import { createUserSlice, UserStore } from "./user-store";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = UserStore

export const useStore = create<Store>()(
    persist(
        (...setGet) => ({
            ...createUserSlice(...setGet),
        }),
        {
            name: "cardapiei-facil-storage",
            storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
        }
    )
)