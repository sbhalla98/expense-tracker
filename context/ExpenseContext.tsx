import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Expense = {
  id: string;
  amount: number;
  category: string;
  date: string;
};

type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  totalExpenses: number;
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expenseWithId = {
      ...newExpense,
      id: Date.now().toString(),
    };
    setExpenses([expenseWithId, ...expenses]);
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, totalExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
}
