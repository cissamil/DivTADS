import { supabase } from "@/src/utils/supabase";
import { Alert } from "react-native";
import { GroupComposition } from "../home/models/GroupComposition";
import { GroupDomain } from "../home/models/GroupDomain";

export class GroupService {
  public async getGroupsGeneralInformationsByUserId(
    userId: string,
  ): Promise<GroupComposition[] | null> {
    const { data, error } = await supabase
      .from("v_user_groups_summary")
      .select("*")
      .eq("member_user_id", userId);

    if (error) {
      console.error("Erro ao buscar grupos: ", error.message);
      throw new Error("Erro ao buscar grupos");
    }

    return data.map((group) => ({
      id: group.group_id,
      title: group.title,
      totalBalance: group.total_balance,
      description: group.description,
      creatorId: group.creator_id,
      createdAt: new Date(group.created_at),
      numberOfExpenses: group.number_of_expenses,
      numberOfMembers: group.number_of_members,
    }));
  }

  public async createNewGroup(group: GroupDomain): Promise<void> {
    const title = group.getTitle();
    const description = group.getDescription();
    const total_balance = group.getTotalBalance();
    const creator_id = group.getCreatorId();

    try {
      const { error: supabaseError } = await supabase.from("groups").insert([
        {
          title,
          description,
          creator_id,
          total_balance,
        },
      ]);

      if (supabaseError) throw supabaseError;
    } catch (err: any) {
      console.error("Erro ao salvar grupo: " + err.message);
    }
  }

  public async deleteGroup(groupId: string): Promise<void> {
    try {
      const { error: supabaseError } = await supabase
        .from("groups")
        .delete()
        .eq("group_id", groupId);

      if (supabaseError) throw supabaseError;
    } catch (err: any) {
      
      console.error("Erro ao deletar grupo: ", err);
      throw Error("Erro ao deletar grupo: " + err);
    }
  }
  
  public async leaveGroup(memberId: string): Promise<void> {
    try {
        const { error } = await supabase
          .from('members')
          .delete()
          .eq('member_id', memberId);

      if (error) throw error;
    } catch (err: any) {
      
      console.Console

      throw Error("Erro ao deletar grupo: " + err);
    }
  }
}
