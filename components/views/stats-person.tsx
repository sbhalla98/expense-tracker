import useConfigStore from "@/hooks/useConfigStore";
import { Expense } from "@/hooks/useExpenseStore";
import { getExpenseAmount, groupByKey } from "@/utils/arrayUtils";
import { getAmountLabel } from "@/utils/string-utils";
import React from "react";
import { View } from "react-native";
import { StatsLabel } from "./stats-label";

type StatsCategoryProps = {
  expenese: Expense[];
  key?: "paidBy" | "paidFor";
};

export default function StatsPerson({
  expenese,
  key = "paidBy",
}: StatsCategoryProps) {
  const configStore = useConfigStore();

  const totalAmount = getExpenseAmount(expenese);
  const groupedItems = groupByKey(expenese, key);

  const items = Object.keys(groupedItems)
    .sort(
      (a, b) =>
        getExpenseAmount(groupedItems[b]) - getExpenseAmount(groupedItems[a])
    )
    .map((item) => {
      const amount = getExpenseAmount(groupedItems[item]);
      const percentage = ((amount / totalAmount) * 100)?.toFixed(0);
      return {
        key: item,
        leftContent: configStore[item] ?? item,
        rightContent: `${getAmountLabel(amount)} (${percentage}%)`,
      };
    });

  return (
    <View>
      {items.map((item) => (
        <StatsLabel
          key={item.key}
          leftContent={item.leftContent}
          rightContent={item.rightContent}
        />
      ))}
    </View>
  );
}
