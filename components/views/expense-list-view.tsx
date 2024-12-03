import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { Expense } from "@/hooks/useExpenseStore";
import { ExpenseItemView } from "./expense-item-view";

type ExpenseListViewProps = {
  expenses: Expense[];
};
export default function ExpenseListView({ expenses }: ExpenseListViewProps) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item: expense }) => (
        <ExpenseItemView
          key={expense?.id}
          amount={expense?.amount}
          category={expense?.category}
          date={expense?.date}
        />
      )}
      ListEmptyComponent={
        <ThemedText style={styles.noExpenses}>No expenses added yet</ThemedText>
      }
    />
  );
}

const styles = StyleSheet.create({
  expensesList: {
    padding: 16,
    gap: 8,
  },
  noExpenses: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
});
