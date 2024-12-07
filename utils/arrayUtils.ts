import { Expense } from "@/hooks/useExpenseStore";

export const getExpenseAmount = (expense: Expense[]) => {
  return expense.reduce((a, b) => a + Number(b.amount), 0);
};
