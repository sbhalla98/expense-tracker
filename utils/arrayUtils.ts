import { Expense } from "@/hooks/useExpenseStore";

export const getExpenseAmount = (expense: Expense[] = []) => {
  return expense.reduce((a, b) => a + Number(b.amount), 0);
};

export function groupByKey<T>(data: T[], key: keyof T): Record<string, T[]> {
  if (!Array.isArray(data)) {
    throw new Error("The first argument must be an array.");
  }

  return data.reduce((grouped: Record<string, T[]>, item: T) => {
    const groupKey = String(item[key]); // Convert key to string for safe object key usage
    if (!grouped[groupKey]) {
      grouped[groupKey] = [];
    }
    grouped[groupKey].push(item);
    return grouped;
  }, {});
}
