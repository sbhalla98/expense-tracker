import {
  EXPENSE_CATEGORY_OPTIONS,
  EXPENSE_CATEGORY_VALUES,
  PAID_BY_OPTIONS,
  PAID_FOR_OPTIONS,
  PERSONS,
} from "@/constants/expense-constants";
import { Expense } from "@/hooks/useExpenseStore";
import { useState } from "react";
import { View } from "react-native";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import ChipSelector from "../common/ChipSelector";
import { FormField } from "./form-field";

type AddExpenseFormProps = {
  labels: {
    [person: string]: string | undefined;
  };
  onSubmit: (expense: {
    amount: number;
    category: string;
    date: string;
    description?: string;
    paidBy: Expense["paidBy"];
    paidFor: Expense["paidFor"];
  }) => void;
};

export function AddExpenseView({ onSubmit, labels = {} }: AddExpenseFormProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [paidBy, setPaidBy] = useState<Expense["paidBy"]>(PERSONS.PERSON1);
  const [paidFor, setPaidFor] = useState<Expense["paidFor"]>(PERSONS.BOTH);
  const [category, setCategory] = useState<string>(
    EXPENSE_CATEGORY_VALUES.FOOD,
  );
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!amount || isNaN(Number(amount)))
      newErrors.amount = "Amount is required and must be a number.";
    if (!category) newErrors.category = "Category is required.";
    if (!paidBy) newErrors.paidBy = "Please select who paid.";
    if (!paidFor) newErrors.paidFor = "Please select who it was paid for.";
    if (!date) newErrors.date = "Please select a date.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    onSubmit({
      amount: parseFloat(amount),
      category,
      date: (date ?? new Date()).toISOString(),
      description,
      paidBy,
      paidFor,
    });

    // Reset form
    setAmount("");
    setCategory(EXPENSE_CATEGORY_VALUES.FOOD);
    setPaidBy(PERSONS.PERSON1);
    setPaidFor(PERSONS.BOTH);
    setDescription("");
    setErrors({});
  };

  return (
    <View>
      {/* Date */}
      <FormField label="Expense Date" error={errors.date}>
        <DatePickerInput
          locale="en"
          label="Select Date"
          value={date}
          onChange={setDate}
          inputMode="start"
          mode="outlined"
        />
      </FormField>

      {/* Paid By */}
      <FormField label="Paid By" error={errors.paidBy}>
        <SegmentedButtons
          value={paidBy}
          onValueChange={setPaidBy}
          buttons={PAID_BY_OPTIONS.map((item) => ({
            value: item,
            label: labels[item] || item,
          }))}
        />
      </FormField>

      {/* Paid For */}
      <FormField label="Paid For" error={errors.paidFor}>
        <SegmentedButtons
          value={paidFor}
          onValueChange={setPaidFor}
          buttons={PAID_FOR_OPTIONS.map((item) => ({
            value: item,
            label: labels[item] || item,
          }))}
        />
      </FormField>

      {/* Category */}
      <FormField label="Category" error={errors.category}>
        <ChipSelector
          value={category}
          onChange={setCategory}
          options={EXPENSE_CATEGORY_OPTIONS}
        />
      </FormField>

      {/* Amount */}
      <FormField error={errors.amount}>
        <TextInput
          label="Amount"
          mode="outlined"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </FormField>

      {/* Description */}
      <FormField>
        <TextInput
          label="Description"
          mode="outlined"
          value={description}
          onChangeText={setDescription}
          multiline
          style={{ height: 100 }}
        />
      </FormField>

      {/* Submit Button */}
      <Button mode="contained" onPress={handleSubmit}>
        Add Expense
      </Button>
    </View>
  );
}
