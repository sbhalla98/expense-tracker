import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { ExpenseItem } from '../../components/ExpenseItem';
import useExpenseStore from '../../hooks/useExpense';
import { Ionicons } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import { useThemeColor } from '@/hooks/useThemeColor';
import { getSortedExpenses } from '@/utils/arrayUtils';

type SortOption = 'date' | 'amount';
type SortOrder = 'asc' | 'desc';

export default function AllExpensesScreen() {
  const { expenses = [], totalExpenses } = useExpenseStore();
  const backgroundColor = useThemeColor({ light: "#fff", dark: "rgb(21, 23, 24)" }, 'background');
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortOrder('desc');
    }
  };

  const sortedExpenses = getSortedExpenses(expenses, sortOrder, sortBy) ?? [];

  return (
    <ThemedView style={{ ...styles.container, backgroundColor }}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">All Expenses</ThemedText>
        <ThemedView style={styles.totalContainer}>
          <ThemedText type="title" style={styles.totalAmount}>Total Expenses:</ThemedText>
          <ThemedText type="title" style={styles.totalAmount}>
            ₹ {totalExpenses?.toFixed(2)}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.sortContainer}>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'date' && styles.activeSortButton]}
          onPress={() => toggleSort('date')}
        >
          <ThemedText style={[styles.sortText, sortBy === 'date' && styles.activeSortText]}>
            Date {sortBy === 'date' && (
              <Ionicons
                name={sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'}
                size={16}
                color={sortBy === 'date' ? '#fff' : '#000'}
              />
            )}
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortBy === 'amount' && styles.activeSortButton]}
          onPress={() => toggleSort('amount')}
        >
          <ThemedText style={[styles.sortText, sortBy === 'amount' && styles.activeSortText]}>
            Amount {sortBy === 'amount' && (
              <Ionicons
                name={sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'}
                size={16}
                color={sortBy === 'amount' ? '#fff' : '#000'}
              />
            )}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.expensesList}>
        {sortedExpenses?.length === 0 ? (
          <ThemedText style={styles.noExpenses}>
            No expenses added yet
          </ThemedText>
        ) : (
          <FlatList
            data={sortedExpenses}
            keyExtractor={item => item.id}
            renderItem={({ item: expense }) => (
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
    backgroundColor: "rgb(21, 23, 24)",
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
    color: 'rgba(0,122,255,1.00)'
  },
  totalAmount: {
    color: '#007AFF',
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sortButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activeSortButton: {
    backgroundColor: '#007AFF',
  },
  sortText: {
    color: '#000',
  },
  activeSortText: {
    color: '#fff',
  },
  expensesList: {
    padding: 16,
    gap: 8,
  },
  noExpenses: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});
