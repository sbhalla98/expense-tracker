import { PERSONS } from "@/constants/expense-constants";
import { STORAGE_KEYS } from "@/constants/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Expense = {
  id: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
  paidBy?: PERSONS.PERSON1 | PERSONS.PERSON2;
  paidFor?: PERSONS;
};

type ExpenseStore = {
  expenses: Expense[];
  totalExpenses: number;
  addExpense: (newExpense: Omit<Expense, "id">) => void;
  removeExpense: (removeExpenseId: string) => void;
  removeAllExpense: () => void;
};

export const useExpenseStore = create<ExpenseStore>()(
  persist(
    (set, get) => {
      return {
        expenses: [],
        totalExpenses: 0,
        addExpense: (newExpense: Omit<Expense, "id">) => {
          const expenseWithId = {
            ...newExpense,
            id: Date.now().toString(),
          };
          let prevExpenses = get()?.expenses ?? [];
          const updatedExpenses = [expenseWithId, ...prevExpenses];
          set({
            expenses: updatedExpenses,
            totalExpenses: updatedExpenses?.reduce(
              (res: number, item: Expense) => res + item.amount,
              0,
            ),
          });
        },
        removeExpense: (removeExpenseId: string) => {
          const updatedExpenses = get()?.expenses.filter(
            (expense: Expense) => expense.id !== removeExpenseId,
          );
          set({
            expenses: updatedExpenses,
            totalExpenses: updatedExpenses?.reduce(
              (res: number, item: Expense) => res + item.amount,
              0,
            ),
          });
        },
        removeAllExpense: () => {
          const updatedExpenses: Array<Expense> = [];
          set({ expenses: updatedExpenses, totalExpenses: 0 });
        },
      };
    },
    {
      name: STORAGE_KEYS.EXPENSES,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useExpenseStore;
