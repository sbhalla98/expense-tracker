import { ScrollView, StyleSheet, View } from "react-native";
import { AddExpenseForm } from "../../components/AddExpenseForm";
import useExpenseStore from "../../hooks/useExpenseStore";
import { Divider, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { addExpense } = useExpenseStore();

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        Add Expense
      </Text>
      <Divider />
      <ScrollView>
        <View style={styles.scrollArea}>
          <AddExpenseForm onSubmit={addExpense} />
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
