import { PERSONS_CONFIG } from "@/constants/expense-constants";
import useConfigStore from "@/hooks/useConfigStore";
import { Expense } from "@/hooks/useExpenseStore";
import { getAmountLabel } from "@/utils/string-utils";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

type ExpenseItemProps = {
  expense: Expense;
  onLongPress: () => void;
};

export function ExpenseItemView({ expense, onLongPress }: ExpenseItemProps) {
  const theme = useTheme();
  const configStore = useConfigStore();

  const { category, amount, description, date, paidBy, paidFor } =
    expense ?? {};

  const paidByLabel =
    paidBy && configStore[paidBy] ? `${configStore[paidBy]} paid` : "";
  const dateLabel = new Date(date)?.toLocaleDateString();

  const getBackgroundColor = () => {
    if (!paidFor) return theme.colors.surface;

    const config = PERSONS_CONFIG[paidFor];
    if (!config || !config.backgroundColor) return theme.colors.surface;
    return (
      theme.colors[config.backgroundColor as keyof MD3Colors] ??
      theme.colors.surface
    );
  };

  if (!expense) {
    return null;
  }

  return (
    <TouchableOpacity onLongPress={onLongPress}>
      <View
        style={{
          ...styles.container,
          backgroundColor: getBackgroundColor(),
        }}
      >
        <View style={styles.leftContent}>
          <Text variant="labelLarge">{category}</Text>
          <Text variant="labelSmall">{description}</Text>
          <Text variant="labelSmall">{dateLabel}</Text>
        </View>
        <View style={styles.rightContent}>
          <Text variant="labelSmall">{paidByLabel}</Text>
          <Text variant="labelLarge">{getAmountLabel(amount)}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
});
