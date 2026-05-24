import { supabase } from "@/src/utils/supabase";
import { GroupEntity } from "../models/GroupEntity";

export class GroupService{

    public async getGroupsGeneralInformationsByUserId(userId:string) : Promise<GroupEntity[] | null>{
        const {data, error} = await supabase
            .from('v_user_groups_summary')
            .select('*')
            .eq('member_user_id', userId);

        if(error){
            console.error("Erro ao buscar grupos: ", error.message);
            return null;
        }

        console.log("Data: ", data);

        return data.map(group =>({
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


}