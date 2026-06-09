import { createContext, ReactNode, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { ExpenseComposition } from '../features/groups/models/ExpenseComposition';
import { ExpenseDomain } from '../features/groups/models/ExpenseDomain';
import { ExpenseService } from '../features/services/ExpenseService';


const expenseService: ExpenseService = new ExpenseService();

interface ExpenseContextData {
    expensesByGroup: ExpenseComposition[];
    allExpenses: ExpenseComposition[];
    isLoading: boolean;
    error: string | null;
    fetchExpensesByGroup: (groupId: string) => Promise<void>;
    fetchAllExpensesByUserId: (userId:string) => Promise<void>;
    createExpense: (
        groupId: string,
        totalAmount: number,
        memberId: string,
        description?: string,
        category?: string,
        receiptUrl?: string,
    ) => Promise<void>;
    deleteExpense: (expenseId: string) => Promise<void>;
}

//createContext
export const ExpenseContext = createContext<ExpenseContextData>({} as ExpenseContextData)


interface ExpenseProviderProps {
    children: ReactNode;
}

/* --------------------------------------------------------------------------------------------------------------------------------------------------- */

//Provider
export function ExpenseProvider({ children }: ExpenseProviderProps) {
    const [expensesByGroup, setExpensesByGroup] = useState<ExpenseComposition[]>([]);
    const [allExpenses, setAllExpenses] = useState<ExpenseComposition[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAllExpensesByUserId = async (userId:string) =>{
        setIsLoading(true);
        setError(null);
        try {
            
            const expenses = await expenseService.getAllExpenseMemberInformationsByUserId(userId);

            if (expenses) setAllExpenses(expenses);

        } catch (err: any) {
            console.error('Erro ao buscar despesas:', err.message);
            setError('Nenhuma despesa cadastrada. Crie uma nova para começar!');
            setExpensesByGroup([]);
        } finally {
            setIsLoading(false);
        }
    }

    // 1. buscar despesas do Supabase
    const fetchExpensesByGroup = async (groupId: string) => {
        setIsLoading(true);
        setError(null);
        try {

            const groupExpenses = await expenseService.getExpenseMemberInformationsByGroupId(groupId);

            if (groupExpenses) setExpensesByGroup(groupExpenses);

        } catch (err: any) {
            console.error('Erro ao buscar despesas:', err.message);
            setError('Nenhuma despesa cadastrada. Crie uma nova para começar!');
            setExpensesByGroup([]);
        } finally {
            setIsLoading(false);
        }
    };

    // 2. criar despesa com refresh
    const createExpense = async (groupId: string, totalAmount: number, memberId: string, description?: string, category?: string, receiptUrl?: string) => {

        setIsLoading(true);

        const expense = new ExpenseDomain(groupId, memberId, totalAmount, description ?? '', category ?? '', receiptUrl ?? '');

        try {
            await expenseService.createNewExpense(expense);

            await fetchExpensesByGroup(groupId);
        } catch (err: any) {
            console.error("Erro ao cadastrar a despesa: ", err);
            Alert.alert('Erro ao salvar', 'Não foi possível criar a despesa no servidor :(');
        } finally {
            setIsLoading(false);
        }
    };

    //3. deletar despesa
    const deleteExpense = async (expenseId: string) => {
        try {
            await expenseService.deleteExpense(expenseId);
        } catch (err: any) {
            Alert.alert('Erro ao deletar.", "Não foi possível remover a despesa: ' + err);
        }
    };

    //4.add editar despesas

    const contextValue: ExpenseContextData = {
        expensesByGroup,
        allExpenses,
        isLoading,
        error,
        fetchAllExpensesByUserId: fetchAllExpensesByUserId,
        fetchExpensesByGroup,
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
export function useExpense() {
    const context = useContext(ExpenseContext);
    if (!context) {
        throw new Error('useExpense deve ser usado dentro de um ExpenseProvider!!!!!');

    }
    return context;
}







