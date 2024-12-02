import { STORAGE_KEYS } from '@/storage/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Expense = {
  id: string;
  amount: number;
  category: string;
  date: string;
};


export const useExpenseStore = create(
  persist(
    (set, get) => {
      return {
        expenses: [],
        totalExpenses: 0,
        addExpense: (newExpense: Omit<Expense, 'id'>) => {
          const expenseWithId = {
            ...newExpense,
            id: Date.now().toString(),
          };
          let prevExpenses = get()?.expenses ?? [];
          const updatedExpenses = [expenseWithId, ...prevExpenses];
          set({ expenses: updatedExpenses, totalExpenses: updatedExpenses?.reduce((res: number, item: Expense) => res + item.amount, 0) });
        },
        removeExpense: (removeExpense: Expense) => {
          const updatedExpenses = get()?.expenses.filter((expense: Expense) => expense.id !== removeExpense.id);
          set({ expenses: updatedExpenses, totalExpenses: updatedExpenses?.reduce((res: number, item: Expense) => res + item.amount, 0) });
        },
        removeAllExpense: () => {
          const updatedExpenses: Array<Expense> = [];
          set({ expenses: updatedExpenses, totalExpenses: 0 });
        }
      }
    }, {
    name: STORAGE_KEYS.EXPENSES,
    storage: createJSONStorage(() => AsyncStorage),
  })

);

export default useExpenseStore;