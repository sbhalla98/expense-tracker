import { Expense } from "@/hooks/useExpenseStore";
import { getExpenseAmount, groupByKey } from "@/utils/arrayUtils";
import { getAmountLabel } from "@/utils/string-utils";
import React from "react";
import { View } from "react-native";
import { StatsLabel } from "./stats-label";

type StatsCategoryProps = {
  expenese: Expense[];
};
export default function StatsCategory({ expenese }: StatsCategoryProps) {
  const groupedItems = groupByKey(expenese, "category");
  const totalAmount = getExpenseAmount(expenese);

  const items = Object.keys(groupedItems)
    .sort(
      (a, b) =>
        getExpenseAmount(groupedItems[b]) - getExpenseAmount(groupedItems[a]),
    )
    .map((item) => {
      const amount = getExpenseAmount(groupedItems[item]);
      const percentage = ((amount / totalAmount) * 100)?.toFixed(0);
      return {
        key: item,
        leftContent: item,
        rightContent: `${getAmountLabel(amount)} (${percentage}%)`,
      };
    });

  return (
    <View style={{ gap: 10 }}>
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
