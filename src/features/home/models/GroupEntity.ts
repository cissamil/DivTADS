export interface GroupEntity {
  id: string;
  title: string;
  numberOfMembers: number;
  numberOfExpenses: number;
  totalBalance: number;
  description?: string | null;
  creatorId: string;
  createdAt: Date;
}
