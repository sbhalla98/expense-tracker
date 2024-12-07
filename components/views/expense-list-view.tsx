import React from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { Expense } from "@/hooks/useExpenseStore";
import { ExpenseItemView } from "./expense-item-view";
import { Divider, Text, useTheme } from "react-native-paper";
import { getAmountLabel } from "@/utils/string-utils";
import { getGroupedByDate } from "@/utils/arrayUtils";

type ExpenseListViewProps = {
  expenses: Expense[];
};

export default function ExpenseListView({ expenses }: ExpenseListViewProps) {
  const theme = useTheme();

  const groupedList = getGroupedByDate(expenses);

  return (
    <>
      <SectionList
        sections={groupedList}
        keyExtractor={(item) => item.id}
        renderItem={({ item: expense }) => (
          <ExpenseItemView key={expense?.id} expense={expense} />
        )}
        renderSectionHeader={({ section: { title, amount } }) => (
          <>
            <Divider />
            <View
              style={{
                ...styles.expenseGroupHeading,
                backgroundColor: theme?.colors?.surfaceVariant,
              }}
            >
              <Text variant="bodyMedium" style={styles.expenseGroupHeadingText}>
                {title}
              </Text>
              <Text variant="bodyMedium" style={styles.expenseGroupHeadingText}>
                {getAmountLabel(amount)}
              </Text>
            </View>
            <Divider />
          </>
        )}
        ListEmptyComponent={() => (
          <ThemedText style={styles.noExpenses}>
            No expenses added yet
          </ThemedText>
        )}
        SectionSeparatorComponent={(obj, i) => {
          if (!obj.trailingItem) return <View style={styles.groupSeparator} />;
        }}
        stickySectionHeadersEnabled
      />
    </>
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
  expenseGroupHeading: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  expenseGroupHeadingText: {
    fontWeight: 700,
  },
  groupSeparator: {
    height: 20,
  },
});
