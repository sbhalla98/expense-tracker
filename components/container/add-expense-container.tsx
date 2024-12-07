import { ScrollView, View } from "react-native";
import useExpenseStore from "../../hooks/useExpenseStore";
import { AddExpenseView } from "../views/add-expense-view";

export default function AddExpenseContainer() {
  const { addExpense } = useExpenseStore();

  return (
    <ScrollView>
      <View style={{ padding: 16 }}>
        <AddExpenseView onSubmit={addExpense} />
      </View>
    </ScrollView>
  );
}
