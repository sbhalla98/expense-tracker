import { STORAGE_KEYS } from "@/constants/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Expense = {
  id: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
  paidBy?: string;
  paidFor?: string;
};

type ConfigStore = {
  person1: string;
  person2: string;
  setLabels: (person1: string, person2: string) => void;
};

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set) => {
      return {
        person1: "",
        person2: "",
        setLabels: (person1, person2) => {
          set({
            person1,
            person2,
          });
        },
      };
    },
    {
      name: STORAGE_KEYS.CONFIG,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useConfigStore;
