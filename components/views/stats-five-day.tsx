import { Expense } from "@/hooks/useExpenseStore";
import { getExpenseAmount } from "@/utils/arrayUtils";
import { getAmountLabel } from "@/utils/string-utils";
import React from "react";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import StatsPerson from "./stats-person";

type StatsFiveDayProps = {
  expenses: Expense[];
};

const SLABS = {
  0: {
    start: 1,
    end: 5,
    label: "1-5",
  },
  1: {
    start: 6,
    end: 10,
    label: "6-10",
  },
  2: {
    start: 11,
    end: 15,
    label: "11-15",
  },
  3: {
    start: 16,
    end: 20,
    label: "16-20",
  },
  4: {
    start: 21,
    end: 25,
    label: "21-25",
  },
  5: {
    start: 26,
    end: 31,
    label: "26-31",
  },
};

const getSections = (expenses: Expense[]) => {
  const sections: Expense[][] = [[], [], [], [], [], []];
  expenses.forEach((expense) => {
    const date = new Date(expense.date).getDate();
    if (date >= SLABS[0].start && date <= SLABS[0].end) {
      sections[0].push(expense);
    } else if (date >= SLABS[1].start && date <= SLABS[1].end) {
      sections[1].push(expense);
    } else if (date >= SLABS[2].start && date <= SLABS[2].end) {
      sections[2].push(expense);
    } else if (date >= SLABS[3].start && date <= SLABS[3].end) {
      sections[3].push(expense);
    } else if (date >= SLABS[4].start && date <= SLABS[4].end) {
      sections[4].push(expense);
    } else if (date >= SLABS[5].start && date <= SLABS[5].end) {
      sections[5].push(expense);
    }
  });

  return sections;
};

export default function StatsFiveDay({ expenses = [] }: StatsFiveDayProps) {
  const theme = useTheme();
  const sections = getSections(expenses);

  return (
    <View style={{ gap: 10 }}>
      {sections.map((currentSectionExpenses, index) => {
        return (
          <View key={index}>
            {currentSectionExpenses.length > 0 ? (
              <>
                <View
                  style={{
                    backgroundColor: theme.colors.onPrimaryContainer,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                  }}
                >
                  <Text
                    variant="bodyMedium"
                    style={{
                      color: theme.colors.primaryContainer,
                    }}
                  >
                    {SLABS[index]?.label}
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{
                      color: theme.colors.primaryContainer,
                    }}
                  >
                    {getAmountLabel(getExpenseAmount(currentSectionExpenses))}
                  </Text>
                </View>
                <StatsPerson
                  expenese={currentSectionExpenses}
                  itemKey="paidFor"
                />
              </>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}
