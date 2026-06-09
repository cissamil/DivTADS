export interface ExpenseComposition {
  expenseId: string;
  groupId: string;
  memberId: string;
  groupName:string;
  userId: string;
  receiptUrl?: string;
  memberName: string;
  totalAmount: number;
  description: string | null;
  category?: string | null;
  createdAt: Date;
}
