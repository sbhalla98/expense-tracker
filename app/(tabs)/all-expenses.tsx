import { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { ExpenseItem } from '../../components/ExpenseItem';
import { useExpenses } from '../../context/ExpenseContext';
import { Ionicons } from '@expo/vector-icons';

type SortOption = 'date' | 'amount';
type SortOrder = 'asc' | 'desc';

export default function AllExpensesScreen() {
  const { expenses, totalExpenses } = useExpenses();
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

  const getSortedExpenses = () => {
    return [...expenses].sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
    });
  };

  const sortedExpenses = getSortedExpenses();

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">All Expenses</ThemedText>
        <ThemedView style={styles.totalContainer}>
          <ThemedText type="subtitle">Total Expenses:</ThemedText>
          <ThemedText type="title" style={styles.totalAmount}>
            ${totalExpenses.toFixed(2)}
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
        {expenses.length === 0 ? (
          <ThemedText style={styles.noExpenses}>
            No expenses added yet
          </ThemedText>
        ) : (
          sortedExpenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              amount={expense.amount}
              category={expense.category}
              date={expense.date}
            />
          ))
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
