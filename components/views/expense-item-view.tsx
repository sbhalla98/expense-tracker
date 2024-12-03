import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Expense } from "@/hooks/useExpenseStore";

type ExpenseItemProps = {
  expense: Expense;
};

export function ExpenseItemView({ expense }: ExpenseItemProps) {
  const theme = useTheme();

  const { category, amount, description, date, paidBy, paidFor } =
    expense ?? {};

  if (!expense) {
    return null;
  }

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme?.colors?.surface }}
    >
      <View style={styles.leftContent}>
        <Text variant="labelLarge">{category}</Text>
        <Text variant="labelSmall">{description}</Text>
        <Text variant="labelSmall">{date}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text variant="labelLarge">₹ {Math.round(amount)}</Text>
        {paidFor ? (
          <Text
            variant="labelSmall"
            style={{
              ...styles.paidBy,
              backgroundColor: theme.colors.primaryContainer,
              color: theme.colors.onPrimaryContainer,
            }}
          >
            Paid For: {paidFor}
          </Text>
        ) : null}
        {paidBy ? (
          <Text
            variant="labelSmall"
            style={{
              ...styles.paidBy,
              backgroundColor: theme.colors.primaryContainer,
              color: theme.colors.onPrimaryContainer,
            }}
          >
            Paid By: {paidBy}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  leftContent: {
    gap: 4,
  },
  rightContent: {
    gap: 4,
    alignItems: "flex-end",
  },
  paidBy: {
    borderRadius: 4,
    padding: 4,
  },
});
