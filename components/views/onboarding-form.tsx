import { PERSONS } from "@/constants/expense-constants";
import { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { FormField } from "./form-field";

type OnboardingFormProps = {
  onSubmit: (person1: string, person2: string) => void;
  initialValue: {
    [PERSONS.PERSON1]: string | undefined;
    [PERSONS.PERSON2]: string | undefined;
  };
};

export function OnboardingForm({
  onSubmit,
  initialValue,
}: OnboardingFormProps) {
  const [person1, setPerson1] = useState(initialValue[PERSONS.PERSON1] ?? "");
  const [person2, setPerson2] = useState(initialValue[PERSONS.PERSON2] ?? "");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!person1) newErrors.person1 = "Please enter the name of person 1";
    if (!person2) newErrors.person2 = "Please enter the name of person 2";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    onSubmit(person1, person2);

    // Reset form
    setPerson1("");
    setPerson2("");
    setErrors({});
  };
  return (
    <View>
      {/* Person1 */}
      <FormField error={errors.person1}>
        <TextInput
          label="Person 1 Name"
          mode="outlined"
          value={person1}
          onChangeText={setPerson1}
        />
      </FormField>

      {/* Person2 */}
      <FormField error={errors.person2}>
        <TextInput
          label="Person 2 Name"
          mode="outlined"
          value={person2}
          onChangeText={setPerson2}
        />
      </FormField>

      {/* Submit Button */}
      <Button mode="contained" onPress={handleSubmit}>
        Submit
      </Button>
    </View>
  );
}
