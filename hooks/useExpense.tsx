import { STORAGE_KEYS, Storage } from '@/storage/storage';
import  { useState, useEffect } from 'react';

export type Expense = {
  id: string;
  amount: number;
  category: string;
  date: string;
};

export function useExpenses() {
  const [expenses, setExpenses] = useState<Array<Expense>>([]);

  const addExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expenseWithId = {
      ...newExpense,
      id: Date.now().toString(),
    };
    let prevExpenses = expenses ?? [];
    const updatedExpenses = [expenseWithId, ...prevExpenses];
    Storage.setItem(STORAGE_KEYS.EXPENSES, updatedExpenses);
    setExpenses(updatedExpenses);
  };

  const removeExpense = (removeExpense: Expense) => {
    const updatedExpenses = expenses.filter((expense:Expense) => expense.id !== removeExpense.id);
    Storage.setItem(STORAGE_KEYS.EXPENSES, updatedExpenses);
    setExpenses(updatedExpenses);
  };

  const removeAllExpense = () => {
    const updatedExpenses: Array<Expense> = [];
    Storage.setItem(STORAGE_KEYS.EXPENSES, updatedExpenses);
    setExpenses(updatedExpenses);
  };

  const getData = async () => {
    try{
      const recentExpenses = await Storage.getItem(STORAGE_KEYS.EXPENSES);
      setExpenses(recentExpenses?.slice(0,5));
    }catch{
      console.error("Error In Fetching Data..")
    }
  }

  useEffect(() => {
    getData();
  },[])

  return {
    expenses,
    addExpense,
    totalExpenses: expenses?.reduce((res: number, item: Expense) => res + item.amount,0),
    removeExpense,
    removeAllExpense
  };
}
