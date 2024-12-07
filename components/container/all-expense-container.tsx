import useExpenseStore from "../../hooks/useExpenseStore";
import { Divider } from "react-native-paper";
import ExpenseListView from "../views/expense-list-view";
import { getAmountLabel } from "@/utils/string-utils";
import { getCurrentMonthExpenses, getExpenseAmount } from "@/utils/arrayUtils";
import { useState, useMemo } from "react";
import MonthSelectorView from "../views/month-selector-view";

export default function AllExpensesContainer() {
  const { expenses = [] } = useExpenseStore();
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  const currentMonthExpenses = getCurrentMonthExpenses(expenses, currentDate);

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
      <ExpenseListView expenses={currentMonthExpenses} />
    </>
  );
}
