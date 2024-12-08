import { Stack, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import useConfigStore from "@/hooks/useConfigStore";
import useExpenseStore from "@/hooks/useExpenseStore";
import { useState } from "react";
import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";
import { OnboardingForm } from "../views/onboarding-form";

export default function OnboardingContainer() {
  const router = useRouter();
  const theme = useTheme();

  const [showWarning, setShowWarning] = useState(false);
  const { PERSON1, PERSON2, setLabels } = useConfigStore();
  const { removeAllExpense } = useExpenseStore();

  const onSubmit = (person1: string, person2: string) => {
    setLabels(person1, person2);
    router.back();
  };

  const openWarningModal = () => {
    setShowWarning(true);
  };

  const closeWarningModal = () => {
    setShowWarning(false);
  };

  return (
    <>
      <Stack.Screen options={{ title: "Onboarding" }} />
      <View style={styles.container}>
        <OnboardingForm
          onSubmit={onSubmit}
          initialValue={{ PERSON1, PERSON2 }}
        />
      </View>
      <View>
        <Button onPress={openWarningModal} textColor={theme.colors.error}>
          Delete all Expenses
        </Button>
        <Portal>
          <Dialog visible={showWarning} onDismiss={closeWarningModal}>
            <Dialog.Title>Are You sure?</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">
                Do you want to delete all the expenses?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={removeAllExpense}>Yes</Button>
              <Button onPress={closeWarningModal}>No</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
