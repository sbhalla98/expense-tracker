import { Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import useConfigStore from "@/hooks/useConfigStore";
import { TouchableOpacity } from "react-native";
import { Icon, useTheme } from "react-native-paper";

export default function TabLayout() {
  const router = useRouter();
  const theme = useTheme();
  const { PERSON1, PERSON2 } = useConfigStore();

  const navigateToOnboarding = () => {
    router.push("/onboarding");
  };

  const checkOnboarding = () => {
    setTimeout(() => {
      if (!PERSON1 || !PERSON2) {
        navigateToOnboarding();
      }
    }, 2000);
  };

  useEffect(() => {
    checkOnboarding();
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
          headerRight: () => (
            <TouchableOpacity
              style={{ padding: 8 }}
              onPress={navigateToOnboarding}
            >
              <Icon source="cog" size={24} />
            </TouchableOpacity>
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
