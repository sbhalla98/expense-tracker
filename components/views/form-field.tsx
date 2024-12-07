import { View } from "react-native";
import { HelperText, Text } from "react-native-paper";

export function FormField({
  label,
  error,
  children,
}: {
  label?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <View>
      {label && <Text variant="labelLarge">{label}</Text>}
      {children}
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
    </View>
  );
}
