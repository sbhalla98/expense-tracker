import { StyleSheet } from "react-native";
import useExpenseStore from "../../hooks/useExpenseStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Text } from "react-native-paper";
import ExpenseListView from "../views/expense-list-view";

export default function AllExpensesContainer() {
  const { expenses = [], totalExpenses } = useExpenseStore();

  const sortedExpenses = expenses ?? [];

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        Transactions
      </Text>
      <Divider />
      <Text
        variant="headlineSmall"
        style={{ ...styles.header, ...styles.totalAmount }}
      >
        Total Expenses: ₹ {totalExpenses?.toFixed(2)}
      </Text>
      <Divider />

      <ExpenseListView expenses={sortedExpenses} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    margin: "auto",
    display: "flex",
    flex: 1,
  },
  header: {
    padding: 16,
    fontWeight: 700,
  },
  totalAmount: {
    color: "#007AFF",
  },
});
