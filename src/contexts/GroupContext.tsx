import { createContext, ReactNode, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { GroupComposition } from '../features/home/models/GroupComposition';
import { GroupDomain } from '../features/home/models/GroupDomain';
import { GroupService } from '../features/services/GroupService';
import { supabase } from '../utils/supabase';

const groupService: GroupService = new GroupService();

interface GroupContextData {
    groupsList: GroupComposition[];
    selectedGroup: GroupComposition | null;
    isLoading: boolean;
    error: string | null;
    fetchGroups: (userId: string) => Promise<void>;
    createGroup: (
    title: string,
        description: string,
        creatorId: string
    ) => Promise<void>;
    deleteGroup: (groupId: string) => Promise<void>;
    editGroup: (groupId: string, newData: Partial<GroupComposition>) => Promise<void>;
    selectGroup: (group: GroupComposition) => void;
    leaveGroup: (memberId: string) => Promise<void>;
}

/* --------------------------------------------------------------------------------------------------------------------------------------------------- */

//createContext
export const GroupContext = createContext<GroupContextData>({} as GroupContextData)

interface GroupProviderProps {
    children: ReactNode;
}

//Provider
export function GroupProvider({ children }: GroupProviderProps) {
    const [groups, setGroups] = useState<GroupComposition[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedGroup, setSelectedGroup] = useState<GroupComposition | null>(null);

    //1.buscar grupos do supabase
    const fetchGroups = async (userId: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await groupService.getGroupsGeneralInformationsByUserId(userId)

            if (!data) {
                setError("Erro ao pegar grupos");
                return;
            }
            
            setGroups(data);
        } catch (err: any) {
            console.error('Erro ao buscar grupos:', err.message);
            setError('Nenhum grupo cadastrado. Crie um novo grupo para começar!')
            setGroups([]);
        }

        finally {
            setIsLoading(false);
        }
    };

    const selectGroup = (group: GroupComposition) =>{
        setIsLoading(true);
        setError(null);

        setSelectedGroup(group);

        setIsLoading(false);
    }

    //2.criar grupo com refresh
    const createGroup = async (title: string, description: string, creatorId: string) => {
        setIsLoading(true);
        setError(null);

        const groupDomain = new GroupDomain(title, description, creatorId);

        console.log(`Titulo: ${title}, Descrição: ${description}, Criador: '${creatorId}'`);

        try {
            await groupService.createNewGroup(groupDomain);

            await fetchGroups(creatorId);

        } catch (err: any) {
            setError("Erro ao salvar");
            Alert.alert('Erro ao salvar', 'Nao foi possivel criar o grupo no servior :(');
        }

        setIsLoading(false)
    };

    //3. deletar grupo
    const deleteGroup = async (groupId: string) => {
        setIsLoading(true);
        try{
            await groupService.deleteGroup(groupId);
            setGroups((prevGroups) => prevGroups.filter((g) => g.id !== groupId));
        }catch(err : any){
            setError(err);
            return;
        }finally{
            setIsLoading(false);
        }

    };

    const leaveGroup = async (memberId: string) => {
        setIsLoading(true);
        try{
            await groupService.leaveGroup(memberId);
            setGroups((prevGroups) => prevGroups.filter((g) => g.id !== memberId));
        }catch(err : any){
            setError(err);
            return;
        }finally{
            setIsLoading(false);
        }

    };

    //4.editar grupo
    const editGroup = async (groupId: string, newData: Partial<GroupComposition>) => {
        const backupGroups = [...groups];
        setGroups((prevGroups) =>
            prevGroups.map((group) =>
                group.id === groupId ? { ...group, ...newData } : group
            )
        );

        try {
            const payload: Record<string, unknown> = {};

            if (newData.title !== undefined) payload.title = newData.title;
            if (newData.description !== undefined) payload.description = newData.description;
            if (newData.totalBalance !== undefined) payload.total_balance = newData.totalBalance;

            const { error: supabaseError } = await supabase
                .from('groups')
                .update(payload)
                .eq('id', groupId);

            if (supabaseError) throw supabaseError;
        } catch (err: any) {
            setGroups(backupGroups);
            Alert.alert('Erro ao editar', 'Não foi possível atualizar o grupo.');
        }
    };

    const contextValue: GroupContextData = {
        groupsList: groups,
        selectedGroup,
        isLoading,
        error,
        fetchGroups,
        createGroup,
        deleteGroup,
        editGroup,
        selectGroup,
        leaveGroup
    };

    return (
        <GroupContext.Provider value={contextValue}>
            {children}
        </GroupContext.Provider>
    );

}

//useContext
export const useGroup = () => useContext(GroupContext);