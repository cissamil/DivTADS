import { StyleSheet } from "react-native";


export const AddExpensesButtonComponentStyle = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#6366f1',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  fabText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export const InviteUserButtonComponentStyle = StyleSheet.create({
  actionFooter: {
    paddingHorizontal: 16,
    backgroundColor: '#1a1a1a',
  },
  inviteButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  inviteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export const ExpensesListComponentStyle = StyleSheet.create({
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  itemTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  itemSubtitle: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  itemAmount: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
  },



});
export const MembersListComponentStyle = StyleSheet.create({
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  itemTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
  },

  memberBalance: {
    fontSize: 14,
    fontWeight: '600',
  },
  positiveBalance: {
    color: '#10b981',
  },
  negativeBalance: {
    color: '#ef4444',
  },

});
export const GroupSummaryComponentStyle = StyleSheet.create({
  summaryCard: {
    backgroundColor: '#262626',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#666',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  summarySubtitle: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '500',
  },
});
export const GroupHeaderComponentStyle = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#262626',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    paddingVertical: 4,
  },
  backButtonText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

});

export const MenuSelectorComponentStyle = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#262626',
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  toggleButtonActive: {
    backgroundColor: '#1a1a1a',
  },
  toggleText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 14,
  },
  toggleTextActive: {
    color: '#6366f1',
  },
});
export const GroupDetailsScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },

});