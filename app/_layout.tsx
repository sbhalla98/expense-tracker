import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const theme = {
    ...(colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme),
    roundness: 8,
    colors: {
      ...(colorScheme === "dark"
        ? {
            ...MD3DarkTheme.colors,
            shade1: "#C75A6C",
            shade2: "#469392",
            shade3: "#428F66",
            shade4: "#AB8A62",
          }
        : {
            ...MD3LightTheme.colors,
            shade1: "#FFAEBC",
            shade2: "#A0E7E5",
            shade3: "#B4F8C8",
            shade4: "#FBE7C6",
          }),
    },
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack
            screenOptions={{
              contentStyle: {
                maxWidth: 600,
                width: "100%",
                margin: "auto",
              },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
