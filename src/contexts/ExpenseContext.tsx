import {
    createContext,
    ReactNode,
    useContext,
    useState
} from 'react';
import { Alert } from 'react-native';
import { ExpenseEntity } from '../features/groups/models/ExpenseEntity';
import { supabase } from '../utils/supabase';

interface ExpenseContextData{
    expenses: ExpenseEntity[];
    isLoading: boolean;
    error: string | null;
    fetchExpenses: (groupId: string | number) => Promise<void>;
    createExpense: (
        groupId: string | number,
        totalAmount: number,
        description?: string,
        memberId?: string | number | null,
        category?: string
    ) => Promise<void>;
    deleteExpense: (expenseId: string | number) => Promise<void>;
}

//createContext
export const ExpenseContext = createContext<ExpenseContextData>({} as ExpenseContextData)


interface ExpenseProviderProps { 
    children: ReactNode;
}

/* --------------------------------------------------------------------------------------------------------------------------------------------------- */

//Provider
 export function ExpenseProvider({ children }: ExpenseProviderProps){
    const [expenses, setExpenses] = useState<ExpenseEntity[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // 1. buscar despesas do Supabase
    const fetchExpenses = async (groupId: string | number) => {
    setIsLoading(true);
    setError(null);
    try {
        const { data, error: supabaseError } = await supabase
            .from('expenses')
            .select('*')
            .eq('group_id', Number(groupId))
            .order('created_at', { ascending: false });

        if (supabaseError) throw supabaseError;

        
        const expensesFormatados: ExpenseEntity[] = (data ?? []).map((row: any) => ({
            expenseId: String(row.id),
            groupId: String(row.group_id),
            memberId: row.member_id ? String(row.member_id) : null,
            totalAmount: Number(row.total_amount ?? 0),
            description: row.description ?? null,
            category: row.category ?? null,
            createdAt: row.created_at,
        }));

        
        setExpenses(expensesFormatados);
        
    } catch (err: any) {
        console.error('Erro ao buscar despesas:', err.message);
        setError('Nenhuma despesa cadastrada. Crie uma nova para começar!');
        setExpenses([]);
    } finally {
        setIsLoading(false);
    }
};

    // 2. criar despesa com refresh
    const createExpense = async (
        groupId: string | number,
        totalAmount: number,
        description?: string,
        memberId?: string | number | null,
        category?: string
    ) => {

        const temporaryExpense: ExpenseEntity = {
            expenseId: String(Date.now()),
            groupId: String(groupId),
            memberId: memberId ? String(memberId) : null,
            totalAmount,
            description: description ?? null,
            category: category ?? null,
            createdAt: new Date().toISOString(),
        };

        const backupExpenses = [...expenses];
        setExpenses((prevExpenses) => [temporaryExpense, ...prevExpenses]);

        try {
            const { error: supabaseError } = await supabase
                .from('expenses')
                .insert([{ 
                    group_id: Number(groupId),
                    member_id: memberId ? Number(memberId) : null,
                    total_amount: totalAmount,
                    description: description ?? null,
                    category: category ?? null,
                }]);

            if (supabaseError) throw supabaseError;
        } catch (err: any) {
            setExpenses(backupExpenses);
            Alert.alert('Erro ao salvar', 'Não foi possível criar a despesa no servidor :(');
        }
    };

    //3. deletar despesa
    const deleteExpense = async (expenseId: string | number) => {

        const backupExpenses = [...expenses];
        setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.expenseId !== String(expenseId)));

             try {
                        const { error: supabaseError } = await supabase
                                .from('expenses')
                                .delete()
                                .eq('id', Number(expenseId));

        if (supabaseError) throw supabaseError;
        } catch (err: any) {
        setExpenses(backupExpenses);
        Alert.alert('Erro ao deletar', 'Não foi possível remover a despesa.');
        }
    };

    //4.add editar despesas

    const contextValue: ExpenseContextData = {
        expenses,
        isLoading,
        error,
        fetchExpenses,
        createExpense,
        deleteExpense,
    };

    return (
        <ExpenseContext.Provider value={contextValue}>
            {children}
        </ExpenseContext.Provider>
    );

}

//useContext
export function useExpense(){
    const context = useContext(ExpenseContext);
    if(!context){
        throw new Error('useExpense deve ser usado dentro de um ExpenseProvider!!!!!');

    }
    return context;
}







