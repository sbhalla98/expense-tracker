import useExpenseStore from "../../hooks/useExpenseStore";
import { Divider } from "react-native-paper";
import { getAmountLabel } from "@/utils/string-utils";
import { getExpenseAmount } from "@/utils/arrayUtils";
import { useState, useMemo } from "react";
import MonthSelectorView from "../views/month-selector-view";
import StatsCategory from "../views/stats-category";

export default function StatisticsContainer() {
  const { expenses = [] } = useExpenseStore();
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  const currentMonthExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      if (!expense?.date) return false;
      const expenseDate = new Date(expense.date);
      return (
        expenseDate.getMonth() === currentDate.getMonth() &&
        expenseDate.getFullYear() === currentDate.getFullYear()
      );
    });
  }, [expenses, currentDate]);

  const totalAmountLabel = useMemo(() => {
    const totalAmount = getExpenseAmount(currentMonthExpenses);
    return getAmountLabel(totalAmount);
  }, [currentMonthExpenses]);

  return (
    <>
      <MonthSelectorView
        changeMonth={changeMonth}
        title={`${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`}
        subTitle={`Expenses: ${totalAmountLabel}`}
      />
      <Divider />
      <StatsCategory expenese={currentMonthExpenses} />
    </>
  );
}
