import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Platform.select({
            ios: 'rgba(255, 255, 255, 0.8)',
            default: undefined,
          }),
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="all-expenses"
        options={{
          title: "All Expenses",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? "list" : "list-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons 
              name={focused ? "sparkles" : "sparkles-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
