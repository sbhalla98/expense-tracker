import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

type MonthSelectorViewProps = {
  changeMonth: (number: number) => void;
  title?: string;
  subTitle?: string;
};
export default function MonthSelectorView({
  changeMonth,
  title,
  subTitle,
}: MonthSelectorViewProps) {
  const theme = useTheme();
  return (
    <View style={styles.infoBar}>
      <TouchableOpacity
        onPress={() => changeMonth(-1)}
        accessibilityLabel="Previous Month"
      >
        <Icon source="arrow-left" size={20} />
      </TouchableOpacity>
      <View style={styles.infoTextContainer}>
        <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>
          {title}
        </Text>
        <Text
          variant="titleMedium"
          style={{ ...styles.subTitle, color: theme.colors.primary }}
        >
          {subTitle}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => changeMonth(1)}
        accessibilityLabel="Next Month"
      >
        <Icon source="arrow-right" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    marginBottom: 8,
  },
  infoTextContainer: {
    alignItems: "center",
    flex: 1,
  },
  subTitle: {
    fontWeight: "700",
  },
});
