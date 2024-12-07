import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export function StatsLabel({
  leftContent,
  rightContent,
}: {
  leftContent?: string;
  rightContent?: string;
}) {
  const theme = useTheme();
  return (
    <View>
      <View
        style={{
          ...styles.item,
          borderColor: theme.colors.outline,
          backgroundColor: theme.colors.surface,
        }}
      >
        <Text variant="labelLarge">{leftContent}</Text>
        <Text variant="labelLarge">{rightContent}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 0,
    borderBottomWidth: 1,
    marginTop: 20,
    padding: 8,
  },
});
