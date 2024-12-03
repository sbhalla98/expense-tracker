import { StyleSheet, TouchableOpacity, View } from "react-native";
import useExpenseStore from "../../hooks/useExpenseStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Icon, Text } from "react-native-paper";
import ExpenseListView from "../views/expense-list-view";
import { getAmountLabel } from "@/utils/string-utils";
import { getExpenseAmount } from "@/utils/arrayUtils";
import { useState, useMemo } from "react";

export default function AllExpensesContainer() {
  const { expenses = [] } = useExpenseStore();
  const [currentMonth, setCurrentMonth] = useState(
    new Date().getMonth() + 1 + "/" + new Date().getFullYear()
  );

  const changeMonth = (increment: number) => {
    const [month, year] = currentMonth.split("/");
    const newMonth = Number(month) + increment;

    if (newMonth < 1) {
      setCurrentMonth(`12/${Number(year) - 1}`);
    } else if (newMonth > 12) {
      setCurrentMonth(`01/${Number(year) + 1}`);
    } else {
      setCurrentMonth(`${newMonth < 10 ? `0${newMonth}` : newMonth}/${year}`);
    }
  };

  const currentMonthExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      if (!expense?.date) return false;
      return expense.date.slice(3) === currentMonth;
    });
  }, [expenses, currentMonth]);

  const totalAmountLabel = useMemo(() => {
    const totalAmount = getExpenseAmount(currentMonthExpenses);
    return getAmountLabel(totalAmount);
  }, [currentMonthExpenses]);

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        Transactions
      </Text>
      <Divider />
      <View style={styles.infoBar}>
        <TouchableOpacity
          onPress={() => changeMonth(-1)}
          accessibilityLabel="Previous Month"
        >
          <Icon source="arrow-left" size={20} />
        </TouchableOpacity>
        <View style={styles.infoTextContainer}>
          <Text variant="titleMedium" style={styles.infoText}>
            {currentMonth}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    fontWeight: 700,
  },
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
