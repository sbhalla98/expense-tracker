import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';

type ExpenseItemProps = {
  amount: number;
  category: string;
  date: string;
};

export function ExpenseItem({ amount, category, date }: ExpenseItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <ThemedText type="defaultSemiBold">{category}</ThemedText>
        <ThemedText>{date}</ThemedText>
      </View>
      <ThemedText type="defaultSemiBold">
        ₹ {amount?.toFixed(2)}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  leftContent: {
    gap: 4,
  },
});
