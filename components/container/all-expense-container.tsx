import { PERSONS_CONFIG } from "@/constants/expense-constants";
import useConfigStore from "@/hooks/useConfigStore";
import { getCurrentMonthExpenses, getExpenseAmount } from "@/utils/arrayUtils";
import { getAmountLabel } from "@/utils/string-utils";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { Chip, Divider, Text, useTheme } from "react-native-paper";
import useExpenseStore from "../../hooks/useExpenseStore";
import ExpenseListView from "../views/expense-list-view";
import MonthSelectorView from "../views/month-selector-view";

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

  const syncExpense = async () => {
    console.log("Syncing expenses...");
    const res = await fetch(
      "https://expenses-v2-nine.vercel.app/api/migrate-data",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenses),
      },
    );
    const data = await res.json();
    console.log("Data", data);
  };

  useEffect(() => {
    syncExpense();
  }, [expenses]);

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
            {configStore[key] || key}
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
