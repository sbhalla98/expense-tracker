import useExpenseStore from "../../hooks/useExpenseStore";
import { Divider, Text, useTheme } from "react-native-paper";
import { getAmountLabel } from "@/utils/string-utils";
import { getCurrentMonthExpenses, getExpenseAmount } from "@/utils/arrayUtils";
import { useState, useMemo } from "react";
import MonthSelectorView from "../views/month-selector-view";
import StatsCategory from "../views/stats-category";
import StatsType from "../views/stats-type";
import StatsPerson from "../views/stats-person";
import { View } from "react-native";

export default function StatisticsContainer() {
  const theme = useTheme();
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
      component: (
        <StatsPerson expenese={currentMonthExpenses} itemKey="paidFor" />
      ),
    },
  ];

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  const onStatChange = (value: 1 | -1) => {
    let newValue = currentStat + value;
    if (newValue >= STATS_CONFIGS.length) newValue = 0;
    else if (newValue < 0) newValue = STATS_CONFIGS.length - 1;
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
        subtitleComponent={
          <View style={{ gap: 8, flexDirection: "row", padding: 8 }}>
            {STATS_CONFIGS.map((item, index) => (
              <View
                key={item.type}
                style={{
                  height: 6,
                  width: 6,
                  backgroundColor:
                    index === currentStat
                      ? theme.colors.primary
                      : theme.colors.surfaceVariant,
                  borderRadius: "50%",
                }}
              ></View>
            ))}
          </View>
        }
      />
      <Divider />
      {STATS_CONFIGS[currentStat]?.component}
    </>
  );
}
