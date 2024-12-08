import useConfigStore from "@/hooks/useConfigStore";
import { ScrollView, View } from "react-native";
import useExpenseStore from "../../hooks/useExpenseStore";
import { AddExpenseView } from "../views/add-expense-view";

export default function AddExpenseContainer() {
  const { addExpense } = useExpenseStore();
  const { PERSON1, PERSON2 } = useConfigStore();

  return (
    <ScrollView>
      <View style={{ padding: 16 }}>
        <AddExpenseView
          onSubmit={addExpense}
          labels={{
            PERSON1,
            PERSON2,
          }}
        />
      </View>
    </ScrollView>
  );
}
