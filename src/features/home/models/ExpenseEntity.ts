export interface ExpenseEntity{
    id: string;
    groupId: number;
    memberName?: string;
    totalAmount: number,
    description?: string | null;
    category?: string,
    createdAt?: Date
}