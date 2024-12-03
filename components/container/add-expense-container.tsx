import { ScrollView, StyleSheet, View } from "react-native";
import useExpenseStore from "../../hooks/useExpenseStore";
import { Divider, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddExpenseView } from "../views/add-expense-view";

export default function AddExpenseContainer() {
  const { addExpense } = useExpenseStore();

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        Add Expense
      </Text>
      <Divider />
      <ScrollView>
        <View style={styles.scrollArea}>
          <AddExpenseView onSubmit={addExpense} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    margin: "auto",
    display: "flex",
    flex: 1,
  },
  header: {
    padding: 16,
    fontWeight: 700,
  },
  scrollArea: {
    padding: 16,
  },
});
