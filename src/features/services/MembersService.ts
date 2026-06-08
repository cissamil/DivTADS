import { supabase } from "@/src/utils/supabase";
import { MemberComposition } from "../home/models/MemberComposition";

export class MembersService {
  public async getGroupsGeneralInformationsByUserId(
    groupId: string,
  ): Promise<MemberComposition[] | null> {
    const { data, error } = await supabase
      .from("v_group_member_information")
      .select("*")
      .eq("member_group_id", groupId);

    if (error) {
      console.error("Erro ao buscar membros: ", error.message);
      throw new Error("Erro ao buscar membros");
    }

    return data.map((member) => ({
      userId: member.user_id,
      groupId: member.member_group_id,
      memberId: member.member_id,
      memberName: member.member_name,
      total_spent: member.total_spent,
      memberPhoneNumber: member.member_phone_number,
    })) as MemberComposition[];
  }
}
