import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";

type MonthSelectorViewProps = {
  changeStats: (number: 1 | -1) => void;
  title?: string;
  subTitle?: string;
  subtitleComponent?: React.ReactNode;
};

export default function StatsType({
  changeStats,
  title,
  subtitleComponent,
}: MonthSelectorViewProps) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => changeStats(-1)}
        accessibilityLabel="Previous Statistic"
      >
        <Icon source="arrow-left" size={20} />
      </TouchableOpacity>
      <View style={styles.centerContainer}>
        <Text variant="titleMedium" style={{ color: theme.colors.secondary }}>
          {title}
        </Text>
        {subtitleComponent}
      </View>
      <TouchableOpacity
        onPress={() => changeStats(1)}
        accessibilityLabel="Next Statistic"
      >
        <Icon source="arrow-right" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    marginBottom: 8,
  },
  centerContainer: {
    alignItems: "center",
    flex: 1,
  },
  subTitle: {
    fontWeight: "700",
  },
});
