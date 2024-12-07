import { Expense } from "@/hooks/useExpenseStore";
import { getExpenseAmount, groupByKey } from "@/utils/arrayUtils";
import { getAmountLabel } from "@/utils/string-utils";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

type StatsCategoryProps = {
  expenese: Expense[];
};
export default function StatsCategory({ expenese }: StatsCategoryProps) {
  const theme = useTheme();

  const groupedItems = groupByKey(expenese, "category");
  const totalAmount = getExpenseAmount(expenese);

  const items = Object.keys(groupedItems)
    .sort(
      (a, b) =>
        getExpenseAmount(groupedItems[b]) - getExpenseAmount(groupedItems[a])
    )
    .map((item) => {
      const amount = getExpenseAmount(groupedItems[item]);
      return {
        category: item,
        amount,
        percentage: (amount / totalAmount) * 100,
      };
    });

  return (
    <View>
      {items.map((item) => (
        <View key={item.category}>
          <View style={{ ...styles.item, borderColor: theme.colors.outline }}>
            <Text variant="labelLarge">{item.category}</Text>
            <Text variant="labelLarge">
              {getAmountLabel(item.amount)} ({item.percentage?.toFixed(0)} %)
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0,
    borderBottomWidth: 1,
    marginTop: 20,
    padding: 8,
  },
});
