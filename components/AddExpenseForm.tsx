import { useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

type AddExpenseFormProps = {
  onSubmit: (expense: {
    amount: number;
    category: string;
    date: string;
  }) => void;
};

export function AddExpenseForm({ onSubmit }: AddExpenseFormProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    if (!amount || !category) return;

    const currentDate = new Date().toLocaleDateString();
    onSubmit({
      amount: parseFloat(amount),
      category,
      date: currentDate,
    });

    // Reset form
    setAmount("");
    setCategory("");
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
          placeholderTextColor="#666"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <ThemedText style={styles.buttonText}>Add Expense</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  inputContainer: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff"
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
