import {
    createContext,
    ReactNode,
    useContext,
    useState
} from 'react';
import { Alert } from 'react-native';
import { GroupEntity } from '../features/home/models/GroupEntity';
import { supabase } from '../utils/supabase';
import { useAuth } from './AuthContext';

//estado e acoes
interface GroupContextData {
    groups: GroupEntity[];
    isLoading: boolean;
    error: string | null;
    fetchGroups: () => Promise<void>;
    createGroup: (title: string, description: string, creatorId: string) => Promise<void>;
    deleteGroup: (groupId: string) => Promise<void>;
    editGroup: (groupId: string, newData: Partial<GroupEntity>) => Promise<void>;
}

/* --------------------------------------------------------------------------------------------------------------------------------------------------- */

//createContext
export const GroupContext = createContext<GroupContextData>({} as GroupContextData)

interface GroupProviderProps {
    children: ReactNode;
}

//Provider
 export function GroupProvider({ children }: GroupProviderProps){
    const [groups, setGroups] = useState<GroupEntity[]>([]);
    const[isLoading, setIsLoading] = useState<boolean>(false);
    const[error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    //1.buscar grupos do supabase
    const fetchGroups = async () => {
        setIsLoading(true);
        setError(null);
        try{
        const { data, error: supabaseError } = await supabase
            .from('members')
            .select('group_id, groups:groups(id, title, description, total_balance, creator_id, created_at)')
            .eq('user_id', user?.id)

            if(supabaseError) throw supabaseError;
            const gruposFormatados: GroupEntity[] = data.map((item) => {
                const group = Array.isArray(item.groups) ? item.groups[0] : item.groups;

                return {
                    id: String(group?.id ?? item.group_id),
                    name: group?.title ?? '',
                    description: group?.description ?? null,
                    creatorId: group?.creator_id ? String(group.creator_id) : undefined,
                    createdAt: group?.created_at,
                    totalBalance: Number(group?.total_balance ?? 0),
                    numberOfMembers: 0,
                    numberOfExpenses: 0
                };
            });

            setGroups(gruposFormatados);
        } catch(err:any){
            console.error('Erro ao buscar grupos:', err.message);
            setError('Nenhum grupo cadastrado. Crie um novo grupo para começar!')
            setGroups([]);
        }
        
    finally{

    setIsLoading(false);
    }
    };

    //2.criar grupo com refresh
    const createGroup = async (title: string, description: string, creatorId: string) => {
        const tempId = Date.now().toString();
        const newGroupProvisorio: GroupEntity = {
            id: tempId,
            name: title,
            description: description,
            totalBalance: 0,
            creatorId: creatorId,
            createdAt: new Date().toISOString(),
            numberOfMembers: 0,
            numberOfExpenses: 0
        };
        //atualiza
        const backupGroups = [...groups];
        setGroups((prevGroups) => [newGroupProvisorio, ...prevGroups]);

        //salva no supabase
       
        try {
        const { data, error: supabaseError } = await supabase
            .from('groups')
            .insert([{ 
            title,
            description,
            creator_id: creatorId,
            total_balance: 0
            }])
            .select();

        if (supabaseError) throw supabaseError;

       
        if (data && data[0]) {
            const saved = data[0];
            const mapped: GroupEntity = {
                id: String(saved.id ?? ''),
                name: saved.title,
                description: saved.description,
                creatorId: saved.creator_id ? String(saved.creator_id) : undefined,
                totalBalance: Number(saved.total_balance ?? 0),
                createdAt: saved.created_at,
                numberOfMembers: 0,
                numberOfExpenses: 0
            };

            setGroups((prevGroups) =>
                prevGroups.map((g) => (g.id === tempId ? mapped : g))
            );
        }
        } catch (err: any) {
            setGroups(backupGroups);
            Alert.alert('Erro ao salvar', 'Nao foi possivel criar o grupo no servior :(');
        }
        };

    //3. deletar grupo
    const deleteGroup = async (groupId: string) => {
        const backupGroups = [...groups];
        setGroups((prevGroups) => prevGroups.filter((g) => g.id !== groupId));

       try {
      const { error: supabaseError } = await supabase
        .from('groups')
        .delete()
        .eq('id', groupId);

        if (supabaseError) throw supabaseError;
        } catch (err: any) {
        // se falhar no banco, volta o grupo para a tela
        setGroups(backupGroups);
        Alert.alert('Erro ao deletar', 'Não foi possível remover o grupo.');
        }
    };

    //4.editar grupo
    const editGroup = async (groupId: string, newData: Partial<GroupEntity>) => {
        const backupGroups = [...groups];
        setGroups((prevGroups) =>
            prevGroups.map((group) =>
                group.id === groupId ? { ...group, ...newData } : group
            )
        );

        try {
            const payload: Record<string, unknown> = {};

            if (newData.name !== undefined) payload.title = newData.name;
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
        groups,
        isLoading,
        error,
        fetchGroups,
        createGroup,
        deleteGroup,
        editGroup,
    };

    return (
        <GroupContext.Provider value={contextValue}>
            {children}
        </GroupContext.Provider>
    );

}

//useContext
export function useGroups(){
    const context = useContext(GroupContext);
    if(!context){
        throw new Error('useGroups deve ser usado dentro de um GroupProvider!!!!!');

    }
    return context;
}
