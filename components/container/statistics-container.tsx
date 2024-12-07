import useExpenseStore from "../../hooks/useExpenseStore";
import { Divider, Text } from "react-native-paper";
import { getAmountLabel } from "@/utils/string-utils";
import { getCurrentMonthExpenses, getExpenseAmount } from "@/utils/arrayUtils";
import { useState, useMemo } from "react";
import MonthSelectorView from "../views/month-selector-view";
import StatsCategory from "../views/stats-category";
import StatsType from "../views/stats-type";
import StatsPerson from "../views/stats-person";

export default function StatisticsContainer() {
  const { expenses = [] } = useExpenseStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentStat, setCurrentStat] = useState(0);

  const currentMonthExpenses = getCurrentMonthExpenses(expenses, currentDate);

  const STATS_CONFIGS = [
    {
      type: "category",
      label: "Category",
      component: <StatsCategory expenese={currentMonthExpenses} />,
    },
    {
      type: "paidBy",
      label: "Paid By",
      component: <StatsPerson expenese={currentMonthExpenses} />,
    },
    {
      type: "paidFor",
      label: "Paid For",
      component: <StatsPerson expenese={currentMonthExpenses} key="paidFor" />,
    },
  ];

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  const onStatChange = (value: 1 | -1) => {
    let newValue = currentStat + value;
    setCurrentStat(newValue);
  };

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
      <StatsType
        title={STATS_CONFIGS[currentStat]?.label}
        changeStats={onStatChange}
      />
      <Divider />
      {STATS_CONFIGS[currentStat]?.component}
    </>
  );
}
