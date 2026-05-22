export interface ExpenseEntity{
    id: string;
    groupId: number;
    memberId?: number | null;
    totalAmount: number;
    description?: string | null;
    category?: string | null;
    createdAt?: string;
}