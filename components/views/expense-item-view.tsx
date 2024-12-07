import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Expense } from "@/hooks/useExpenseStore";
import { getAmountLabel } from "@/utils/string-utils";
import useConfigStore from "@/hooks/useConfigStore";
import { PERSONS } from "@/constants/expense-constants";

type ExpenseItemProps = {
  expense: Expense;
};

const getLabel = (value: string, PERSON1: string, PERSON2: string) => {
  if (value === PERSONS.PERSON1) return PERSON1;
  if (value === PERSONS.PERSON2) return PERSON2;
  return value;
};

export function ExpenseItemView({ expense }: ExpenseItemProps) {
  const theme = useTheme();
  const { PERSON1, PERSON2 } = useConfigStore();

  const { category, amount, description, date, paidBy, paidFor } =
    expense ?? {};

  const paidByLabel = getLabel(paidBy ?? "", PERSON1, PERSON2);
  const paidForLabel = getLabel(paidFor ?? "", PERSON1, PERSON2);

  const dateLabel = new Date(date)?.toLocaleDateString();

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
        <Text variant="labelSmall">{dateLabel}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text variant="labelLarge">{getAmountLabel(amount)}</Text>
        {paidFor ? (
          <Text
            variant="labelSmall"
            style={{
              ...styles.paidBy,
              backgroundColor: theme.colors.primaryContainer,
              color: theme.colors.onPrimaryContainer,
            }}
          >
            Paid For: {paidByLabel}
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
            Paid By: {paidForLabel}
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
