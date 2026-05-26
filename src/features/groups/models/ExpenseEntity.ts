export interface ExpenseEntity{
    expenseId: string;
    groupId: string;
    memberId?: string | null;
    totalAmount: number;
    description?: string | null;
    category?: string | null;
    createdAt?: string;
}