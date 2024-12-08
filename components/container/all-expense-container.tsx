import useExpenseStore from "../../hooks/useExpenseStore";
import { Chip, Divider, Text, useTheme } from "react-native-paper";
import ExpenseListView from "../views/expense-list-view";
import { getAmountLabel } from "@/utils/string-utils";
import { getCurrentMonthExpenses, getExpenseAmount } from "@/utils/arrayUtils";
import { useState, useMemo } from "react";
import MonthSelectorView from "../views/month-selector-view";
import { View } from "react-native";
import { PERSONS_CONFIG } from "@/constants/expense-constants";
import useConfigStore from "@/hooks/useConfigStore";

export default function AllExpensesContainer() {
  const theme = useTheme();
  const configStore = useConfigStore();
  const { expenses = [], removeExpense } = useExpenseStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonthExpenses = getCurrentMonthExpenses(expenses, currentDate);

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + increment);
    setCurrentDate(newDate);
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
      <View
        style={{
          flexDirection: "row",
          gap: 6,
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
      >
        <Text variant="bodySmall">Paid For: </Text>
        {Object.keys(PERSONS_CONFIG).map((key) => (
          <Chip
            style={{
              backgroundColor:
                theme.colors[PERSONS_CONFIG[key]?.backgroundColor],
            }}
            compact
          >
            {configStore[key] ?? key}
          </Chip>
        ))}
      </View>
      <ExpenseListView
        expenses={currentMonthExpenses}
        onLongPressItem={removeExpense}
      />
    </>
  );
}
