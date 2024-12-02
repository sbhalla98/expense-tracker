import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedView } from "./ThemedView";
import {
  Button,
  HelperText,
  SegmentedButtons,
  Text,
  TextInput,
} from "react-native-paper";
import {
  EXPENSE_CATEGORY_OPTIONS,
  EXPENSE_CATEGORY_VALUES,
  PAID_BY_OPTIONS,
  PAID_BY_VALUES,
  PAID_FOR_OPTIONS,
  PAID_FOR_VALUES,
} from "@/constants/expense-constants";
import ChipSelector from "./common/ChipSelector";
import { DatePickerInput } from "react-native-paper-dates";

type AddExpenseFormProps = {
  onSubmit: (expense: {
    amount: number;
    category: string;
    date: string;
    description?: string;
    paidBy: string;
    paidFor: string;
  }) => void;
};

export function AddExpenseForm({ onSubmit }: AddExpenseFormProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [paidBy, setPaidBy] = useState<string>(PAID_BY_VALUES.VISHAL);
  const [paidFor, setPaidFor] = useState<string>(PAID_FOR_VALUES.VISHAL);
  const [category, setCategory] = useState<string>(
    EXPENSE_CATEGORY_VALUES.FOOD
  );
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!amount || isNaN(Number(amount))) {
      newErrors.amount = "Amount is required and must be a number.";
    }
    if (!category) {
      newErrors.category = "Category is required.";
    }
    if (!paidBy) {
      newErrors.paidBy = "Please select who paid.";
    }
    if (!paidFor) {
      newErrors.paidFor = "Please select who it was paid for.";
    }
    if (!date) {
      newErrors.date = "Please select a date";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    onSubmit({
      amount: parseFloat(amount),
      category,
      date: (date ?? new Date()).toLocaleDateString(),
      description,
      paidBy,
      paidFor,
    });

    // Reset form
    setDate(new Date());
    setAmount("");
    setCategory(EXPENSE_CATEGORY_VALUES.FOOD);
    setPaidBy(PAID_BY_VALUES.VISHAL);
    setPaidFor(PAID_FOR_VALUES.VISHAL);
    setDescription("");
    setErrors({});
  };

  return (
    <ThemedView style={styles.container}>
      <View>
        {/* Date */}
        <View>
          <DatePickerInput
            locale="en"
            label="Expense Date"
            value={date}
            onChange={setDate}
            inputMode="start"
            mode="outlined"
          />
          <HelperText type="error" visible={!!errors.date}>
            {errors.date}
          </HelperText>
        </View>

        {/* Paid By */}
        <View>
          <Text variant="labelLarge">Paid By</Text>
          <SegmentedButtons
            value={paidBy}
            onValueChange={setPaidBy}
            buttons={PAID_BY_OPTIONS}
          />
          <HelperText type="error" visible={!!errors.paidBy}>
            {errors.paidBy}
          </HelperText>
        </View>

        {/* Paid For */}
        <View>
          <Text variant="labelLarge">Paid For</Text>
          <SegmentedButtons
            value={paidFor}
            onValueChange={setPaidFor}
            buttons={PAID_FOR_OPTIONS}
          />
          <HelperText type="error" visible={!!errors.paidFor}>
            {errors.paidFor}
          </HelperText>
        </View>

        {/* Category */}
        <View>
          <Text variant="labelLarge">Category</Text>
          <ChipSelector
            value={category}
            onChange={setCategory}
            options={EXPENSE_CATEGORY_OPTIONS}
          />
          <HelperText type="error" visible={!!errors.category}>
            {errors.category}
          </HelperText>
        </View>

        {/* Amount */}
        <View>
          <TextInput
            label="Amount"
            mode="outlined"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            error={!!errors.amount}
          />
          <HelperText type="error" visible={!!errors.amount}>
            {errors.amount}
          </HelperText>
        </View>

        {/* Description */}
        <TextInput
          label="Description"
          mode="outlined"
          value={description}
          onChangeText={setDescription}
          multiline
          style={{ height: 100 }}
        />
      </View>

      {/* Submit Button */}
      <Button mode="contained" onPress={handleSubmit}>
        Add Expense
      </Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
});
