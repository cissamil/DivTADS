export interface ExpenseEntity{
    expenseId: string;
    groupId: string;
    memberId: string;
    totalAmount: number;
    description?: string | null;
    category?: string | null;
    createdAt?: string;
}