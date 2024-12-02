import { Expense } from "@/hooks/useExpense";

export const getSortedExpenses = (data: Array<Expense>, sortOrder: 'asc' | 'desc',  sortBy: 'date' | 'amount') => {
    return [...data].sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return sortOrder === 'asc' ? a?.amount - b?.amount : b?.amount - a?.amount;
      }
    });
  };