import {createContext,
        useContext,
        useState,
        useEffect,
        ReactNode   
        }                 from 'react';
import { Alert }          from 'react-native';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase }       from '../utils/supabase';
import { useAuth }        from './AuthContext';

//grupo
export interface Group {
    id_grupo?: number;
    criado_em?: string;
    descricao_grupo: string | null;
    balanceamento_geral?: number;
    id_criador?: number;
    titulo_grupo: string;
}

//estado e acoes
interface GroupContextData {
    groups: Group[];
    isLoading: boolean;
    error: string | null;
    fetchGrorups: () => Promise<void>;
    createGroup: (titulo: string, descricao: string, idCriador: number) => Promise<void>;
    deleteGroup: (groupId: number) => Promise <void>;
    editGroup: (groupId: number, novosDados: Partial<Group>) => Promise<void>;
}

/* --------------------------------------------------------------------------------------------------------------------------------------------------- */

//createContext
export const GroupContext = createContext<GroupContextData>({} as GroupContextData)

interface GroupProviderProps {
    children: ReactNode;
}

//Provider
 export function GroupProvider({ children }: GroupProviderProps){
    const [groups, setGroups] = useState<Group[]>([]);
    const[isLoading, setIsLoading] = useState<boolean>(false);
    const[error, setError] = useState<string | null>(null);
    const { session } = useAuth();

    //1.buscar grupos do supabase
    const fetchGroups = async () => {
        setIsLoading(true);
        setError(null);
        try{
        const { data, error: supabaseError } = await supabase
            .from ('Membros')
            .select ('*,Grupos(*)')
            .eq('id_usuario', session?.user.id)

            if(supabaseError) throw supabaseError;
            
            const gruposFormatados = data.map((item) => {
                return {id_grupo : item.Grupos.id_grupo, titulo_grupo: item.Grupos.titulo_grupo, descricao_grupo: item.Grupos.descricao_grupo, id_criador: item.Grupos.id_criador, balanceamento_geral: item.Grupos.balanceamento_geral }
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
    const createGroup = async (titulo: string, descricao: string, idCriador: number) => {
        const tempId = Date.now();
        const newGroupProvisorio: Group = {
            id: tempId,
            titulo_grupo: titulo,
            descricao_grupo: descricao,
            balanceamento_geral: 0,
            id_criador: idCriador,
            criado_em: new Date().toISOString(),

        };
        //atualiza
        const backupGroups = [...groups];
        setGroups((prevGroups) => [newGroupProvisorio, ...prevGroups]);

        //salva no supabase
       
        try {
        const { data, error: supabaseError } = await supabase
            .from('grupo')
            .insert([{ 
            titulo_grupo: titulo, 
            descricao_grupo: descricao, 
            id_criador: idCriador,
            balanceamento_geral: 0 
            }])
            .select();

        if (supabaseError) throw supabaseError;

        //substitui o grupo temp pelo fixo do banco
        if (data && data[0]) {
            setGroups((prevGroups) =>
                prevGroups.map((g) => (g.id === tempId ? data[0] : g))
        );
        }
        } catch (err: any) {
            setGroups(backupGroups);
            Alert.alert('Erro ao salvar', 'Nao foi possivel criar o grupo no servior :(');
        }
        };

    //3. deletar grupo
    const deleteGroup = async (groupId: number) => {
        const backupGroups = [...groups];
        setGroups((prevGroups) => prevGroups.filter((g) => g.id !== groupId));

       try {
      const { error: supabaseError } = await supabase
        .from('grupo')
        .delete()
        .eq('id', groupId);

        if (supabaseError) throw supabaseError;
        } catch (err: any) {
        // se falhar no banco, volta o grupo para a tela
        setGroups(backupGroups);
        Alert.alert('Erro ao deletar', 'Não foi possível remover o grupo.');
        }
    };
    
    //useContext
    export function useGroups(){
        const context = useContext(GroupContext);
        if(!context){
            throw new Error('useGroups deve ser usado dentro de um GroupProvider!!!!!');

        }
        return context;
    }

    



 

