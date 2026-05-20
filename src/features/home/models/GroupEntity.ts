
export interface GroupEntity{
    id: string;
    name: string;
    numberOfMembers?: number;
    numberOfExpenses?: number;
    totalBalance?: number;
    description?: string | null;
    creatorId?: string;
    createdAt?: string;
}