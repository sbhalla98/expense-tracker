import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { ExpenseItem } from "../../components/ExpenseItem";
import useExpenseStore from "../../hooks/useExpenseStore";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { useThemeColor } from "@/hooks/useThemeColor";
import { getSortedExpenses } from "@/utils/arrayUtils";
import { SafeAreaView } from "react-native-safe-area-context";
import { Divider, Text } from "react-native-paper";

type SortOption = "date" | "amount";
type SortOrder = "asc" | "desc";

export default function AllExpensesScreen() {
  const { expenses = [], totalExpenses } = useExpenseStore();
  const backgroundColor = useThemeColor(
    { light: "#fff", dark: "rgb(21, 23, 24)" },
    "background"
  );
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(option);
      setSortOrder("desc");
    }
  };

  const sortedExpenses = getSortedExpenses(expenses, sortOrder, sortBy) ?? [];

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text variant="headlineMedium" style={styles.header}>
          All Expenses
        </Text>
        <Divider />
        <Text
          variant="headlineMedium"
          style={{ ...styles.header, ...styles.totalAmount }}
        >
          Total Expenses: ₹ {totalExpenses?.toFixed(2)}
        </Text>
        <Divider />

        <ThemedView style={styles.sortContainer}>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortBy === "date" && styles.activeSortButton,
            ]}
            onPress={() => toggleSort("date")}
          >
            <ThemedText
              style={[
                styles.sortText,
                sortBy === "date" && styles.activeSortText,
              ]}
            >
              Date{" "}
              {sortBy === "date" && (
                <Ionicons
                  name={sortOrder === "asc" ? "arrow-up" : "arrow-down"}
                  size={16}
                  color={sortBy === "date" ? "#fff" : "#000"}
                />
              )}
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.sortButton,
              sortBy === "amount" && styles.activeSortButton,
            ]}
            onPress={() => toggleSort("amount")}
          >
            <ThemedText
              style={[
                styles.sortText,
                sortBy === "amount" && styles.activeSortText,
              ]}
            >
              Amount{" "}
              {sortBy === "amount" && (
                <Ionicons
                  name={sortOrder === "asc" ? "arrow-up" : "arrow-down"}
                  size={16}
                  color={sortBy === "amount" ? "#fff" : "#000"}
                />
              )}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.expensesList}>
          {sortedExpenses?.length === 0 ? (
            <ThemedText style={styles.noExpenses}>
              No expenses added yet
            </ThemedText>
          ) : (
            <FlatList
              data={sortedExpenses}
              keyExtractor={(item) => item.id}
              renderItem={({ item: expense }) => (
                <ExpenseItem
                  key={expense?.id}
                  amount={expense?.amount}
                  category={expense?.category}
                  date={expense?.date}
                />
              )}
            />
          )}
        </ThemedView>
      </SafeAreaView>
    </>
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
  totalContainer: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    gap: 8,
    color: "rgba(0,122,255,1.00)",
  },

  sortContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  sortButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  activeSortButton: {
    backgroundColor: "#007AFF",
  },
  sortText: {
    color: "#000",
  },
  activeSortText: {
    color: "#fff",
  },
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
