import { PERSONS } from "@/constants/expense-constants";
import useConfigStore from "@/hooks/useConfigStore";
import { Expense } from "@/hooks/useExpenseStore";
import { getExpenseAmount, groupByKey } from "@/utils/arrayUtils";
import { getAmountLabel } from "@/utils/string-utils";
import React from "react";
import { View } from "react-native";
import { StatsLabel } from "./stats-label";

type StatsCategoryProps = {
  expenese: Expense[];
  itemKey?: "paidBy" | "paidFor";
};

export default function StatsPerson({
  expenese,
  itemKey = "paidBy",
}: StatsCategoryProps) {
  const configStore = useConfigStore();

  const totalAmount = getExpenseAmount(expenese);
  const groupedItems: any = {
    [PERSONS.PERSON1]: [],
    [PERSONS.PERSON2]: [],
    ...groupByKey(expenese, itemKey),
  };

  const getItems = () => {
    const sortedGroupedItems = Object.keys(groupedItems).filter(
      (item) => !(itemKey === "paidFor" && item === PERSONS.BOTH),
    );

    const result = sortedGroupedItems.map((item) => {
      let amount = getExpenseAmount(groupedItems[item]);
      if (itemKey === "paidFor") {
        if (getExpenseAmount(groupedItems[PERSONS.BOTH]))
          amount += getExpenseAmount(groupedItems[PERSONS.BOTH]) / 2;
      }
      const percentage = ((amount / totalAmount) * 100)?.toFixed(0);
      return {
        key: item,
        leftContent: configStore[item] ?? item,
        rightContent: `${getAmountLabel(amount)} (${percentage}%)`,
      };
    });

    return result;
  };

  const items = getItems();

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
