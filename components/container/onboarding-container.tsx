import { Stack, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import { OnboardingForm } from "../views/onboarding-form";
import useConfigStore from "@/hooks/useConfigStore";

export default function OnboardingContainer() {
  const router = useRouter();
  const { person1, person2, setLabels } = useConfigStore();
  const onSubmit = (person1: string, person2: string) => {
    setLabels(person1, person2);
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ title: "Onboarding" }} />
      <View style={styles.container}>
        <OnboardingForm
          onSubmit={onSubmit}
          initialValue={{ person1, person2 }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
