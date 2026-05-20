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
            .from ('Membros')
            .select ('*,Grupos(*)')
            .eq('id_usuario', user?.id)

            if(supabaseError) throw supabaseError;
            const gruposFormatados: GroupEntity[] = data.map((item) => {
                return {
                    id: String(item.Grupos.id_grupo),
                    name: item.Grupos.titulo_grupo,
                    description: item.Grupos.descricao_grupo,
                    creatorId: item.Grupos.id_criador ? String(item.Grupos.id_criador) : undefined,
                    totalBalance: item.Grupos.balanceamento_geral
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
            .from('grupo')
            .insert([{ 
            titulo_grupo: title, 
            descricao_grupo: description, 
            id_criador: creatorId,
            balanceamento_geral: 0 
            }])
            .select();

        if (supabaseError) throw supabaseError;

        //substitui o grupo temp pelo fixo do banco (mapeando para GroupEntity)
        if (data && data[0]) {
            const saved = data[0];
            const mapped: GroupEntity = {
                id: String(saved.id_grupo ?? saved.id ?? ''),
                name: saved.titulo_grupo,
                description: saved.descricao_grupo,
                creatorId: saved.id_criador ? String(saved.id_criador) : undefined,
                totalBalance: saved.balanceamento_geral,
                createdAt: saved.criado_em
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
        .from('grupo')
        .delete()
        .eq('id_grupo', parseInt(groupId));

        if (supabaseError) throw supabaseError;
        } catch (err: any) {
        // se falhar no banco, volta o grupo para a tela
        setGroups(backupGroups);
        Alert.alert('Erro ao deletar', 'Não foi possível remover o grupo.');
        }
    };

}

//useContext
export function useGroups(){
    const context = useContext(GroupContext);
    if(!context){
        throw new Error('useGroups deve ser usado dentro de um GroupProvider!!!!!');

    }
    return context;
}
