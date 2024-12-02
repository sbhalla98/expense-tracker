import { StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { ExpenseItem } from '../../components/ExpenseItem';
import { AddExpenseForm } from '../../components/AddExpenseForm';
import { Expense, useExpenses } from '../../hooks/useExpense';
import { useThemeColor } from '@/hooks/useThemeColor';
import { FlatList } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const { expenses, addExpense, totalExpenses } = useExpenses();
  const backgroundColor = useThemeColor({ light: "#fff", dark: "rgb(21, 23, 24)" }, 'background');

  return (
    <ScrollView style={{ ...styles.container, backgroundColor}}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Expense Tracker</ThemedText>
        <ThemedView style={styles.totalContainer}>
          <ThemedText type="subtitle" style={styles.totalAmount}>Total Expenses:</ThemedText>
          <ThemedText type="title" style={styles.totalAmount}>
            Rs.{totalExpenses.toFixed(2)}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <AddExpenseForm onSubmit={addExpense} />

      <ThemedView style={styles.expensesList}>
        <ThemedText type="subtitle" style={styles.listTitle}>
          Recent Expenses
        </ThemedText>
        {expenses.length === 0 ? (
          <ThemedText style={styles.noExpenses}>
            No expenses added yet
          </ThemedText>
        ) : (
          <FlatList 
          data={expenses}
          keyExtractor={(item: Expense) => item.id}
          renderItem={({ item: expense }: {item: Expense}) => (
              <ExpenseItem
                key={expense?.id}
                amount={expense?.amount}
                category={expense?.category}
                date={expense?.date}
              />
            )}
          />
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
    maxWidth: 400,
    width: "100%",
    margin: "auto"
  },
  header: {
    padding: 16,
    gap: 16,
  },
  totalContainer: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  totalAmount: {
    color: '#007AFF',
  },
  expensesList: {
    padding: 16,
    gap: 8,
    flex: 1
  },
  listTitle: {
    marginBottom: 8,
  },
  noExpenses: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});
