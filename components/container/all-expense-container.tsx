import { StyleSheet, TouchableOpacity, View } from "react-native";
import useExpenseStore from "../../hooks/useExpenseStore";
import { Divider, Icon, Text } from "react-native-paper";
import ExpenseListView from "../views/expense-list-view";
import { getAmountLabel } from "@/utils/string-utils";
import { getExpenseAmount } from "@/utils/arrayUtils";
import { useState, useMemo } from "react";

export default function AllExpensesContainer() {
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
      <View style={styles.infoBar}>
        <TouchableOpacity
          onPress={() => changeMonth(-1)}
          accessibilityLabel="Previous Month"
        >
          <Icon source="arrow-left" size={20} />
        </TouchableOpacity>
        <View style={styles.infoTextContainer}>
          <Text variant="titleMedium" style={styles.infoText}>
            {`${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`}
          </Text>
          <Text variant="titleMedium" style={styles.totalAmount}>
            Expenses: {totalAmountLabel}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => changeMonth(1)}
          accessibilityLabel="Next Month"
        >
          <Icon source="arrow-right" size={20} />
        </TouchableOpacity>
      </View>
      <Divider />
      <ExpenseListView expenses={currentMonthExpenses} />
    </>
  );
}

const styles = StyleSheet.create({
  infoBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    marginBottom: 8,
  },
  infoTextContainer: {
    alignItems: "center",
    flex: 1,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 16,
    color: "#007AFF",
    marginTop: 4,
    fontWeight: "bold",
  },
});
