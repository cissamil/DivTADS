export interface ExpenseComposition {
  expenseId: string;
  groupId: string;
  memberId: string;
  memberName: string;
  totalAmount: number;
  description: string | null;
  category?: string | null;
  createdAt: Date;
}
