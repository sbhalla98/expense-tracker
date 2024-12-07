import { Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import useConfigStore from "@/hooks/useConfigStore";
import { Icon, useTheme } from "react-native-paper";

export default function TabLayout() {
  const router = useRouter();
  const theme = useTheme();
  const { PERSON1, PERSON2 } = useConfigStore();

  useEffect(() => {
    if (!PERSON1 || !PERSON2) {
      setTimeout(() => {
        router.push("/onboarding");
      }, 2000);
    }
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Add Expense",
          tabBarIcon: ({ color }) => (
            <Icon source="plus-box" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="all-expenses"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color }) => (
            <Icon
              source="format-list-bulleted-square"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: "Statistics",
          tabBarIcon: ({ color }) => (
            <Icon source="chart-bar" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
