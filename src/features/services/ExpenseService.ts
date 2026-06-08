import { supabase } from "@/src/utils/supabase";
import { ExpenseComposition } from "../groups/models/ExpenseComposition";
import { ExpenseDomain } from "../groups/models/ExpenseDomain";

export class ExpenseService {
  public async getExpenseMemberInformationsByUserId(
    groupId: string,
  ): Promise<ExpenseComposition[] | null> {
    const { data, error } = await supabase
      .from("v_expense_member_information")
      .select("*")
      .eq("group_id", groupId);

    if (error) {
      console.error("Erro ao buscar grupos: ", error.message);
      throw new Error("Erro ao buscar grupos: ", error);
    }

    return data.map((expense) => ({
      expenseId: expense.expense_id,
      description: expense.description,
      groupId: expense.group_id,
      memberId: expense.member_id,
      memberName: expense.member_name,
      createdAt: new Date(expense.created_at),
      totalAmount: expense.total_amount,
      category: expense.category,
    }));
  }

  public async createNewExpense(expense: ExpenseDomain): Promise<void> {
    const group_id = expense.getGroupId();
    const member_id = expense.getMemberId();
    const total_amount = expense.getTotalAmount();
    const description = expense.getDescription();
    const category = expense.getCategory();
    const receipt_url = expense.getReceiptUrl();

    try {
      const { error: supabaseError } = await supabase.from("expenses").insert([
        {
          group_id,
          member_id,
          total_amount,
          description,
          category,
          receipt_url,
        },
      ]);

      if (supabaseError) throw supabaseError;
    } catch (err: any) {
      console.error("Erro ao salvar grupo: " + err.message);
    }
  }

  public async deleteExpense(expenseId: string) {
    try {
      const { error: supabaseError } = await supabase
        .from("expenses")
        .delete()
        .eq("id", Number(expenseId));

      if (supabaseError) throw supabaseError;
    } catch (err: any) {
      throw Error("Erro ao deletar despesa: ", err);
    }
  }
}
